import { onSchedule } from "firebase-functions/v2/scheduler";
import admin from "firebase-admin";

const app = admin.initializeApp();
const db = app.firestore();

export const fn = onSchedule("* * * * *", async (event) => {
  console.log("⏰ Scheduled function started at", new Date().toISOString());

  const now = admin.firestore.Timestamp.now();

  const snapshot = await db
    .collection("todos")
    .where("reminder", "<=", now)
    .where("notified", "==", false)
    .where("status", "==", "active")
    .get();

  console.log(`Found ${snapshot.size} todo(s) matching criteria`);

  const tokenDoc = await db.doc("settings/fcm").get();
  const tokenData = tokenDoc.exists && tokenDoc.data() ? tokenDoc.data() : null;

  const tokens: string[] = Array.isArray(tokenData?.tokens) ? tokenData.tokens : [];

  if (!tokens.length) {
    console.log("⚠️ No FCM tokens found. Skipping.");
    return;
  }

  console.log(`✅ Retrieved ${tokens.length} FCM token(s)`);
  const messages: admin.messaging.MulticastMessage[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`Processing todo ${doc.id}:`, data);
    messages.push({
      notification: {
        title: "🔔 Reminder",
        body: data.content || "You have a todo due!",
      },
      tokens: tokens,
    });

    // TODO add invalidation - Firebase PWA Notification Delay chat in gpt
    try {
      doc.ref.update({ notified: true });
    } catch (error) {
      console.error(`Failed to update todo ${doc.id}:`, error);
    }
  });
  if (messages.length > 0) {
    const results = await Promise.all(
      messages.map((msg) => admin.messaging().sendEachForMulticast(msg))
    );
    console.log(`✅ Sent ${results.length} notification(s).`);
  } else {
    console.log("ℹ️ No todos to notify.");
  }

})  