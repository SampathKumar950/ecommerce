import React, { useState } from 'react';

const SecuritySettings = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h2>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
        <input
          type="checkbox"
          checked={isTwoFactorEnabled}
          onChange={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
          className="h-5 w-5"
        />
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">Save Changes</button>
    </div>
  );
};

export default SecuritySettings;
