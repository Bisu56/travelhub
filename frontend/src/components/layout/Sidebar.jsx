import React from 'react';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-700 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2"><a href="/dashboard" className="hover:text-gray-300">Overview</a></li>
        <li className="mb-2"><a href="/dashboard/bookings" className="hover:text-gray-300">My Bookings</a></li>
        <li className="mb-2"><a href="/dashboard/profile" className="hover:text-gray-300">Profile</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
