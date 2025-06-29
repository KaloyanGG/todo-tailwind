export const requestNotificationsPermission = async () => {
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notification");
    return;
  }

  if (!window.isSecureContext) {
    console.info("Cannot request notification permission on insecure origin.");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    new Notification("Notifications enabled!", {
      body: "You'll now receive updates.",
    });
  } else {
    console.info("Notification permission:", permission);
  }
}