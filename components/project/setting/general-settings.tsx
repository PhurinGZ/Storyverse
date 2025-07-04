import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import ToggleSwitch from '@/components/project/setting/toggle-switch';
import { FormData } from '@/types/types';

interface GeneralSettingsProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ 
  formData, 
  onInputChange 
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">General Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onInputChange("title", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => onInputChange("genre", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onInputChange("description", e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your project..."
        />
      </div>

      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Collaboration Settings</h3>
        <ToggleSwitch
          checked={formData.allowCollaboration}
          onChange={(checked) => onInputChange("allowCollaboration", checked)}
          label="Allow Collaboration"
          description="Enable others to contribute to your project"
        />
      </div>

      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-red-600 mb-6 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Danger Zone
        </h3>
        <div className="border border-red-200 rounded-lg p-6 bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Delete Project</p>
              <p className="text-sm text-red-600">This action cannot be undone</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;