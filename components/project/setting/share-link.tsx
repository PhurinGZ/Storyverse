import React from 'react';
import { Copy, Check } from 'lucide-react';

interface ShareLinkProps {
  projectId: string;
  copied: boolean;
  onCopy: () => void;
}

const ShareLink: React.FC<ShareLinkProps> = ({ projectId, copied, onCopy }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Share Link</p>
          <p className="text-sm text-gray-500">Anyone with this link can view the project</p>
        </div>
        <button
          onClick={onCopy}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
};

export default ShareLink;