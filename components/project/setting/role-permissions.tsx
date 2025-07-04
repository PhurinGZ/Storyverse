import React from 'react';
import { RolePermissions as RolePermissionsType } from '@/types/types';

interface RolePermissionsProps {
  rolePermissions: Record<string, RolePermissionsType>;
}

const RolePermissions: React.FC<RolePermissionsProps> = ({ rolePermissions }) => {
  return (
    <div className="border-t pt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Role Permissions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Read</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Write</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Admin</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <tr key={role} className="border-t">
                <td className="py-3 px-4 font-medium">{role}</td>
                <td className="text-center py-3 px-4">
                  <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${permissions.read ? 'bg-green-500' : 'bg-red-500'}`}>
                    {permissions.read ? "✓" : "✗"}
                  </div>
                </td>
                <td className="text-center py-3 px-4">
                  <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${permissions.write ? 'bg-green-500' : 'bg-red-500'}`}>
                    {permissions.write ? "✓" : "✗"}
                  </div>
                </td>
                <td className="text-center py-3 px-4">
                  <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${permissions.admin ? 'bg-green-500' : 'bg-red-500'}`}>
                    {permissions.admin ? "✓" : "✗"}
                  </div>
                </td>
                <td className="text-center py-3 px-4">
                  <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${permissions.delete ? 'bg-green-500' : 'bg-red-500'}`}>
                    {permissions.delete ? "✓" : "✗"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolePermissions;