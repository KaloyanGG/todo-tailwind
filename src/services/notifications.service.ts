import { getToken } from "firebase/messaging";
import { messaging } from "../config/firebase";

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
    return;
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

    try {
      const token = await getToken(messaging, {
        vapidKey: 'BAiDKp89hVz1rqPWJ7-Ny4DrYgctubfeGVeXMpi4TyAaOznHjy55vCD1u6UAqr2DTeT3TFTvstRILZCGYQ-GSqI'
      })
      console.info(token)
      return token
    } catch (e) {
      console.info('FCM getError error:')
      console.info(e);
      return;
    }
  }
}



export async function requestNotificationPermission(): Promise<string | null> {
  console.log(Notification.permission)
  switch (Notification.permission) {
    case 'denied': {
      const registration = await navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope');
      await registration?.unregister();
      console.log('SW unregistered...');
      return null;
    }
    case 'default': {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        return null
      }
      try {
        console.log('calling...')
        const token = await getToken(messaging, {
          vapidKey: 'BAiDKp89hVz1rqPWJ7-Ny4DrYgctubfeGVeXMpi4TyAaOznHjy55vCD1u6UAqr2DTeT3TFTvstRILZCGYQ-GSqI'
        })
        return token
      } catch (e) {
        console.error('FCM getError error:')
        console.error(e);
        alert(e)
        return null;
      }
    }
    case 'granted':
      // TODO This is only for iphone purposes, should be deleted!
      await Notification.requestPermission();
      try {
        const token = await getToken(messaging, {
          vapidKey: 'BAiDKp89hVz1rqPWJ7-Ny4DrYgctubfeGVeXMpi4TyAaOznHjy55vCD1u6UAqr2DTeT3TFTvstRILZCGYQ-GSqI'
        })
        return token
      } catch (e) {
        console.error('FCM getError error:')
        console.error(e);
        alert(e)
        return null;
      }
      // TODO return this break 
      // break;
      return null;

  }
}