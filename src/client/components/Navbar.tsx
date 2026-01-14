import React from 'react';
import { Link } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useQuery } from 'wasp/client/operations';
import { getCart } from 'wasp/client/operations';
import { useLanguage, useTranslation } from '../i18n';

export default function Navbar() {
  const { data: user } = useAuth();
  const { data: cart } = useQuery(getCart);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const cartItemCount = cart?.items?.length || 0;

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">🥬 Fruveg Market</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-200 transition">
              {t('home')}
            </Link>
            <Link to="/urunler" className="hover:text-green-200 transition">
              {t('products')}
            </Link>
            {user && (
              <Link to="/siparislerim" className="hover:text-green-200 transition">
                {t('myOrders')}
              </Link>
            )}
            {user?.isAdmin && (
              <Link to="/admin" className="hover:text-green-200 transition">
                {t('adminPanel')}
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage('de')}
                className={`px-2 py-1 rounded ${
                  language === 'de' 
                    ? 'bg-white text-green-600 font-semibold' 
                    : 'hover:text-green-200'
                }`}
              >
                DE
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded ${
                  language === 'en' 
                    ? 'bg-white text-green-600 font-semibold' 
                    : 'hover:text-green-200'
                }`}
              >
                EN
              </button>
            </div>

            {user ? (
              <>
                <Link to="/sepet" className="relative hover:text-green-200 transition">
                  <span className="text-2xl">🛒</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <span className="text-sm">{user.email}</span>
              </>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="hover:text-green-200 transition">
                  {t('login')}
                </Link>
                <Link to="/signup" className="bg-white text-green-600 px-4 py-2 rounded hover:bg-green-100 transition">
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
