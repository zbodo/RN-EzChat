export type Message = {
  id: string;
  text: string;
  timestamp: number;
  isMe: boolean;
};

export type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  online: boolean;
  messages: Message[];
};

export type RootStackParamList = {
  ChatList: undefined;
  ChatDetail: {chatId: string; chatName: string};
};
