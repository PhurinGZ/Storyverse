export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Editor' | 'Viewer';
  avatar: string;
  joinedDate: string;
}

export interface NotificationSettings {
  newCollaborators: boolean;
  comments: boolean;
  mentions: boolean;
  weeklyDigest: boolean;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  genre: string;
  visibility: 'private' | 'public' | 'community';
  allowCollaboration: boolean;
  notifications: NotificationSettings;
  members: ProjectMember[];
}

export interface FormData {
  title: string;
  description: string;
  genre: string;
  visibility: 'private' | 'public' | 'community';
  allowCollaboration: boolean;
  notifications: NotificationSettings;
  allowAnonymousFeedback: boolean;
  showInDiscovery: boolean;
}

export interface RolePermissions {
  read: boolean;
  write: boolean;
  admin: boolean;
  delete: boolean;
}

export type EmailFrequency = 'instant' | 'daily' | 'weekly' | 'never';

export interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}