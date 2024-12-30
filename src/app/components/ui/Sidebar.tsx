import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-5 space-y-6">
      <h2 className="text-xl font-bold">Menu</h2>
      <ul>
        <li>
          <Link href="/dashboard">
            <span className="block py-2">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/tickets">
            <span className="block py-2">Tickets</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
