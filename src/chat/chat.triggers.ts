import * as functions from 'firebase-functions';
import {MessageType} from "../interface/message";
import {UserType} from "../interface/user";
import * as admin from "firebase-admin";
import {PushNotification} from "../push-notification";

const db = admin.firestore();
const usersCollection = db.collection('user');

export const sendNotificationOnChat = functions.firestore.document(`message/{id}`)
  .onWrite(async (change, context) => {
    try {
      const message = change.after.exists ? change.after.data() as MessageType : null;
      if (!message) throw new Error('Document not found');

      const userSnap = await usersCollection.doc(`${message.receiverUid}`).get();
      const user: UserType = userSnap.data() as UserType;

      await PushNotification.send(user.fcmToken, getPayload(message));

    } catch (error) {
      throw new Error(`Notification sending failed : ${error}`);
    }
  });
function getPayload(message: MessageType) {
  if(!message.file && message.file !== '') {
    return {
      notification: {
        title: `You have a message from ${message.senderName}`,
        body: `Message: ${message.text}`
      },
      data: {
        page: 'Chat'
      }
    }
  }

  return {
    notification: {
      title: `You have a message from ${message.senderName}`,
      body: `Message: ${message.text}`,
      image: message.file
    },
    data: {
      page: 'Chat'
    }
  }
}
