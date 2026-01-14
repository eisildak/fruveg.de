import React from 'react';
import { Outlet } from 'react-router-dom';
import './Main.css';

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}
