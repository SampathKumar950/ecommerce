import React, { useState } from 'react';

const Notifications = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications Settings</h2>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">Email Notifications</span>
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
          className="h-5 w-5"
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
        <input
          type="checkbox"
          checked={smsNotifications}
          onChange={() => setSmsNotifications(!smsNotifications)}
          className="h-5 w-5"
        />
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">Save Changes</button>
    </div>
  );
};

export default Notifications;
