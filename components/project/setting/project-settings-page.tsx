import React, { useState } from 'react';
import Header from './header';
import SidebarNavigation from './sidebar-navigation';
import GeneralSettings from './general-settings';
import TeamSettings from './team-settings';
import PrivacySettings from './PVS';
import NotificationSettings from './notification_settings';
import EmailFrequency from './email-frequency';

// Types
interface FormData {
  title: string;
  description: string;
  genre: string;
  allowCollaboration: boolean;
  visibility: string;
  allowAnonymousFeedback: boolean;
  showInDiscovery: boolean;
}

interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinedDate: string;
}

interface NotificationPreferences {
  newCollaborators: boolean;
  comments: boolean;
  mentions: boolean;
  weeklyDigest: boolean;
}

interface RolePermissions {
  read: boolean;
  write: boolean;
  admin: boolean;
  delete: boolean;
}

export default function ProjectSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    title: 'My Creative Project',
    description: 'A collaborative writing project exploring themes of adventure and friendship.',
    genre: 'Adventure Fiction',
    allowCollaboration: true,
    visibility: 'public',
    allowAnonymousFeedback: false,
    showInDiscovery: true
  });

  // Team management state
  const [members, setMembers] = useState<ProjectMember[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      role: 'Owner',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Editor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'Viewer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2024-03-10'
    }
  ]);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer');
  const [copiedLink, setCopiedLink] = useState(false);

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    newCollaborators: true,
    comments: true,
    mentions: true,
    weeklyDigest: false
  });

  const [emailFrequency, setEmailFrequency] = useState('daily');

  // Role permissions
  const rolePermissions: Record<string, RolePermissions> = {
    Owner: { read: true, write: true, admin: true, delete: true },
    Editor: { read: true, write: true, admin: false, delete: false },
    Viewer: { read: true, write: false, admin: false, delete: false }
  };

  // Event handlers
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleNotificationChange = (field: keyof NotificationPreferences, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...', formData);
    setHasChanges(false);
    // Here you would typically save to your backend
  };

  const handleInviteMember = () => {
    if (inviteEmail) {
      console.log('Inviting member:', inviteEmail, 'as', inviteRole);
      // Here you would typically send an invitation
      setInviteEmail('');
      setInviteRole('Viewer');
      setShowInviteForm(false);
    }
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
    setHasChanges(true);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
    setHasChanges(true);
  };

  const handleCopyShareLink = () => {
    const shareUrl = `https://myapp.com/project/${formData.title.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      console.log('Deleting project...');
      // Here you would typically delete the project
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings 
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      
      case 'team':
        return (
          <TeamSettings
            members={members}
            projectId="sample-project-123"
            showInviteForm={showInviteForm}
            setShowInviteForm={setShowInviteForm}
            inviteEmail={inviteEmail}
            setInviteEmail={setInviteEmail}
            inviteRole={inviteRole}
            setInviteRole={setInviteRole}
            copiedLink={copiedLink}
            onInviteMember={handleInviteMember}
            onRoleChange={handleRoleChange}
            onRemoveMember={handleRemoveMember}
            onCopyShareLink={handleCopyShareLink}
            rolePermissions={rolePermissions}
          />
        );
      
      case 'privacy':
        return (
          <PrivacySettings
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      
      case 'notifications':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
            </div>
            
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
              <NotificationSettings
                notifications={notifications}
                onNotificationChange={handleNotificationChange}
              />
            </div>

            <EmailFrequency
              emailFrequency={emailFrequency}
              setEmailFrequency={setEmailFrequency}
            />
          </div>
        );
      
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header
        projectTitle={formData.title}
        hasChanges={hasChanges}
        onSaveChanges={handleSaveChanges}
      />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <SidebarNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-900/5 p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}