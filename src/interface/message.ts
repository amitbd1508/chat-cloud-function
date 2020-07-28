export interface MessageType {
  text: string;
  file: string;
  senderUid: string;
  senderName: string;
  receiverUid: string;
  chatId: string;
  createdAt: number;
}

export const DEFAULT_MESSAGE: MessageType = {
  text: '',
  file: '',
  senderName: '',
  senderUid: '',
  receiverUid: '',
  chatId: '',
  createdAt: Date.now()
};
