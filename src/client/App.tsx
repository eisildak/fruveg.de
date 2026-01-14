import React from 'react';
import { Link } from 'wasp/client/router';
import './Main.css';

export function App({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
