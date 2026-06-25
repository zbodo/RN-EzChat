import type {Chat} from '../types';

const now = Date.now();
const min = 60_000;
const hour = 3_600_000;
const day = 86_400_000;

export const mockChats: Chat[] = [
  {
    id: '1',
    name: '张三',
    avatar: '🧑',
    lastMessage: '周末去爬山吗？',
    lastMessageTime: now - 5 * min,
    unreadCount: 2,
    online: true,
    messages: [
      {id: 'm1', text: '在吗？', timestamp: now - 30 * min, isMe: false},
      {id: 'm2', text: '在的，怎么了', timestamp: now - 28 * min, isMe: true},
      {id: 'm3', text: '周末有空吗', timestamp: now - 10 * min, isMe: false},
      {id: 'm4', text: '有空，什么事', timestamp: now - 8 * min, isMe: true},
      {id: 'm5', text: '周末去爬山吗？', timestamp: now - 5 * min, isMe: false},
    ],
  },
  {
    id: '2',
    name: '李四',
    avatar: '👩',
    lastMessage: '好的，收到',
    lastMessageTime: now - 2 * hour,
    unreadCount: 0,
    online: false,
    messages: [
      {id: 'm1', text: '项目文档发你了', timestamp: now - 3 * hour, isMe: true},
      {id: 'm2', text: '好的，收到', timestamp: now - 2 * hour, isMe: false},
    ],
  },
  {
    id: '3',
    name: '工作群',
    avatar: '👥',
    lastMessage: '[王五] 明天的会议改到下午3点',
    lastMessageTime: now - 4 * hour,
    unreadCount: 5,
    online: false,
    messages: [
      {id: 'm1', text: '明天几点开会？', timestamp: now - 6 * hour, isMe: true},
      {id: 'm2', text: '上午10点吧', timestamp: now - 5 * hour, isMe: false},
      {id: 'm3', text: '我10点有别的安排', timestamp: now - 4.5 * hour, isMe: true},
      {id: 'm4', text: '明天的会议改到下午3点', timestamp: now - 4 * hour, isMe: false},
    ],
  },
  {
    id: '4',
    name: '小红',
    avatar: '👧',
    lastMessage: '哈哈哈太好笑了',
    lastMessageTime: now - 1 * day,
    unreadCount: 0,
    online: true,
    messages: [
      {id: 'm1', text: '你看这个表情包', timestamp: now - 1 * day - 5 * min, isMe: false},
      {id: 'm2', text: '哈哈哈太好笑了', timestamp: now - 1 * day, isMe: true},
    ],
  },
  {
    id: '5',
    name: 'Telegram',
    avatar: '✈️',
    lastMessage: '欢迎使用 EzChat！',
    lastMessageTime: now - 3 * day,
    unreadCount: 1,
    online: false,
    messages: [
      {id: 'm1', text: '欢迎使用 EzChat！', timestamp: now - 3 * day, isMe: false},
    ],
  },
  {
    id: '6',
    name: '老王',
    avatar: '👨‍🦳',
    lastMessage: '下次再聚',
    lastMessageTime: now - 5 * day,
    unreadCount: 0,
    online: false,
    messages: [
      {id: 'm1', text: '上次聚会很开心', timestamp: now - 5 * day - 10 * min, isMe: false},
      {id: 'm2', text: '是啊，下次再聚', timestamp: now - 5 * day, isMe: true},
      {id: 'm3', text: '下次再聚', timestamp: now - 5 * day, isMe: false},
    ],
  },
];
