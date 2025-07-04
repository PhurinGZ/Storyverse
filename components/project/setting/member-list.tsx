import React from 'react';
import { Crown, X } from 'lucide-react';
import { ProjectMember } from '@/types/types';

interface MemberListProps {
  members: ProjectMember[];
  onRoleChange: (memberId: string, newRole: string) => void;
  onRemoveMember: (memberId: string) => void;
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  onRoleChange,
  onRemoveMember
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Team Members ({members.length})</h3>
      {members.map(member => (
        <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-12 h-12 rounded-full ring-2 ring-blue-100"
            />
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                {member.role === "Owner" && (
                  <Crown className="h-4 w-4 text-yellow-500" />
                )}
              </div>
              <p className="text-sm text-gray-500">{member.email}</p>
              <p className="text-xs text-gray-400">Joined {new Date(member.joinedDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {member.role !== "Owner" && (
              <select
                value={member.role}
                onChange={(e) => onRoleChange(member.id, e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
              </select>
            )}
            {member.role === "Owner" && (
              <span className="px-3 py-2 text-sm bg-yellow-100 text-yellow-800 rounded-lg font-medium">
                Owner
              </span>
            )}
            {member.role !== "Owner" && (
              <button
                onClick={() => onRemoveMember(member.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberList;