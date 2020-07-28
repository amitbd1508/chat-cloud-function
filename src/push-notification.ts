import * as admin from 'firebase-admin';

export class PushNotification {
  public static async send(token: string, payload: any) {
    try {
      if (token && token.length <= 0) throw new Error(`Device token not found`);
      const response = await admin.messaging().sendToDevice(token, payload);
      response.results.forEach((result) => {
        const error = result.error;
        if (error && (error.code === 'messaging/invalid-registration-token' ||
          error.code === 'messaging/registration-token-not-registered')) {
          console.warn('invalid or not-registered Token');
        }
      });
    } catch (error) {
      console.error(`Can not send notification: ${token}`);
    }
  }
}
