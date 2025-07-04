import React from 'react';

interface RadioOptionProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({ 
  value, 
  checked, 
  onChange, 
  icon: Icon, 
  label, 
  description 
}) => {
  return (
    <div 
      onClick={() => onChange(value)}
      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
        checked ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${checked ? "bg-blue-100" : "bg-gray-100"}`}>
            <Icon className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">{label}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <input
          type="radio"
          checked={checked}
          onChange={() => onChange(value)}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default RadioOption;