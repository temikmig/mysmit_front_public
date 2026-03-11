export interface NotificationsList {
  notifications: NotificationBody[];
  total: number;
  totalNoRead: number;
}

export interface NotificationBody {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  checklistId?: string;
}
