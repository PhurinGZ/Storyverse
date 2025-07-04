import React from 'react';
import { Lock, Eye, Globe } from 'lucide-react';
import { FormData } from '@/types/types';
import RadioOption from '@/components/project/setting/radio-option';
import ToggleSwitch from '@/components/project/setting/toggle-switch';

interface PrivacySettingsProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ 
  formData, 
  onInputChange 
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
      </div>

      <div className="space-y-4">
        <RadioOption
          value="private"
          checked={formData.visibility === "private"}
          onChange={(value) => onInputChange("visibility", value)}
          icon={Lock}
          label="Private Project"
          description="Only team members can access"
        />

        <RadioOption
          value="public"
          checked={formData.visibility === "public"}
          onChange={(value) => onInputChange("visibility", value)}
          icon={Eye}
          label="Public Project"
          description="Anyone can view but not edit"
        />

        <RadioOption
          value="community"
          checked={formData.visibility === "community"}
          onChange={(value) => onInputChange("visibility", value)}
          icon={Globe}
          label="Community Project"
          description="Open for community collaboration"
        />
      </div>

      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Privacy Options</h3>
        <div className="space-y-6">
          <ToggleSwitch
            checked={formData.allowAnonymousFeedback}
            onChange={(checked) => onInputChange("allowAnonymousFeedback", checked)}
            label="Allow Anonymous Feedback"
            description="Let visitors leave feedback without signing up"
          />

          <ToggleSwitch
            checked={formData.showInDiscovery}
            onChange={(checked) => onInputChange("showInDiscovery", checked)}
            label="Show in Discovery"
            description="Include project in public discovery feeds"
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;