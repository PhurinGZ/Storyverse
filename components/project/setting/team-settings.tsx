import React from 'react';
import { UserPlus } from 'lucide-react';
import { ProjectMember, RolePermissions as RolePermissionsType } from '@/types/types';
import InviteForm from '@/components/project/setting/invite-form';
import ShareLink from '@/components/project/setting/share-link';
import MemberList from '@/components/project/setting/member-list';
import RolePermissions from '@/components/project/setting/role-permissions';

interface TeamSettingsProps {
  members: ProjectMember[];
  projectId: string;
  showInviteForm: boolean;
  setShowInviteForm: (show: boolean) => void;
  inviteEmail: string;
  setInviteEmail: (email: string) => void;
  inviteRole: string;
  setInviteRole: (role: string) => void;
  copiedLink: boolean;
  onInviteMember: () => void;
  onRoleChange: (memberId: string, newRole: string) => void;
  onRemoveMember: (memberId: string) => void;
  onCopyShareLink: () => void;
  rolePermissions: Record<string, RolePermissionsType>;
}

const TeamSettings: React.FC<TeamSettingsProps> = ({
  members,
  projectId,
  showInviteForm,
  setShowInviteForm,
  inviteEmail,
  setInviteEmail,
  inviteRole,
  setInviteRole,
  copiedLink,
  onInviteMember,
  onRoleChange,
  onRemoveMember,
  onCopyShareLink,
  rolePermissions
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <button 
          onClick={() => setShowInviteForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {showInviteForm && (
        <InviteForm
          inviteEmail={inviteEmail}
          setInviteEmail={setInviteEmail}
          inviteRole={inviteRole}
          setInviteRole={setInviteRole}
          onInvite={onInviteMember}
          onClose={() => setShowInviteForm(false)}
        />
      )}

      <ShareLink
        projectId={projectId}
        copied={copiedLink}
        onCopy={onCopyShareLink}
      />

      <MemberList
        members={members}
        onRoleChange={onRoleChange}
        onRemoveMember={onRemoveMember}
      />

      <RolePermissions rolePermissions={rolePermissions} />
    </div>
  );
};

export default TeamSettings;