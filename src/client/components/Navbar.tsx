import React from 'react';
import { Link } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useQuery } from 'wasp/client/operations';
import { getCart } from 'wasp/client/operations';
import logo from '../../assets/logo_fruveg.svg';

export default function Navbar() {
  const { data: user } = useAuth();
  const { data: cart } = useQuery(getCart, undefined, { enabled: !!user });

  const cartItemCount = cart?.items?.length || 0;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Fruveg" className="h-16 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
            <Link to="/" className="hover:text-green-600 transition">Startseite</Link>
            <Link to="/urunler" className="hover:text-green-600 transition">Sortiment</Link>
            <a href="/#uber-uns" className="hover:text-green-600 transition">Über uns</a>
            <a href="/#portfolio" className="hover:text-green-600 transition">Portfolio</a>
            <a href="/#szene" className="hover:text-green-600 transition">Szene</a>
            <a href="/#kontakt" className="hover:text-green-600 transition">Kontakt</a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 text-gray-600">
            {user ? (
              <>
                <Link to="/sepet" className="relative hover:text-green-600 transition">
                  <span className="text-2xl">🛒</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <span className="text-sm border border-gray-200 px-3 py-1 rounded-full">{user.email}</span>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-green-600 transition">
                  Anmelden
                </Link>
                <Link to="/signup" className="bg-green-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-700 transition shadow-md">
                  Registrieren
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
