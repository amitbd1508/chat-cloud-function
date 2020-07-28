import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp(functions.config().firebase);

export * from './chat/chat.triggers'
