import { getToken } from "firebase/messaging";
import { db, messaging } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const requestNotificationsPermission = async () => {
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notification");
    return;
  }

  if (!window.isSecureContext) {
    console.info("Cannot request notification permission on insecure origin.");
    return;
  }

  const permission = Notification.permission;

  if (permission === 'granted') {
    console.info('Permission already granted')
    return await fetchTokenAndUpdateInDb();
  }

  if (permission === 'denied') {
    const registration = await navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope');
    await registration?.unregister();
    console.info('SW unregistered...');
    return;
  }

  if (permission === 'default') {
    const p = await Notification.requestPermission();
    if (p !== 'granted') {
      console.info('Permission not granted. Actual: ', p)
      return;
    }
    await fetchTokenAndUpdateInDb();
  }
}

const fetchTokenAndUpdateInDb = async () => {
  try {
    const lastCheckedDate = localStorage.getItem('lastCheckedDate');
    if (lastCheckedDate && new Date(lastCheckedDate).getTime() > Date.now() - 1000 * 60 * 60 * 24) {
      console.info('Last checked date is less than 24 hours ago. Skipping token fetch.');
      return;
    }
    localStorage.setItem('lastCheckedDate', new Date().toISOString());

    const token = await getToken(messaging, {
      vapidKey: 'BAiDKp89hVz1rqPWJ7-Ny4DrYgctubfeGVeXMpi4TyAaOznHjy55vCD1u6UAqr2DTeT3TFTvstRILZCGYQ-GSqI',
    })

    const fcmRef = doc(db, "settings", "fcm");
    const existing = await getDoc(fcmRef);
    let tokens: string[] = [];

    if (existing.exists()) {
      const data = existing.data();
      tokens = Array.isArray(data.tokens) ? data.tokens : [];
    }

    if (!tokens.includes(token)) {
      tokens.push(token);
      await setDoc(fcmRef, { tokens });
      console.info("✅ Token added to Firestore array.");
    } else {
      console.info("ℹ️ Token already exists in Firestore.");
    }

    return token
  } catch (e) {
    console.info('FCM getError error:')
    console.info(e);
    return;
  }
}