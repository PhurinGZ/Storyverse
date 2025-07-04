import React from 'react';
import { X, Mail } from 'lucide-react';

interface InviteFormProps {
  inviteEmail: string;
  setInviteEmail: (email: string) => void;
  inviteRole: string;
  setInviteRole: (role: string) => void;
  onInvite: () => void;
  onClose: () => void;
}

const InviteForm: React.FC<InviteFormProps> = ({
  inviteEmail,
  setInviteEmail,
  inviteRole,
  setInviteRole,
  onInvite,
  onClose
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Invite New Member</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <input
            type="email"
            placeholder="Enter email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Viewer">Viewer</option>
            <option value="Editor">Editor</option>
          </select>
          <button 
            onClick={onInvite}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>Invite</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteForm;