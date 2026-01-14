import { ForgotPasswordForm } from 'wasp/client/auth';
import { Link } from 'wasp/client/router';

export default function PasswordReset() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Passwort zurücksetzen</h1>
          <p className="text-gray-600">Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen</p>
        </div>

        <ForgotPasswordForm />

        <div className="mt-6 text-center">
          <Link to="/login" className="text-green-600 hover:text-green-800 font-semibold">
            ← Zurück zur Anmeldeseite
          </Link>
        </div>
      </div>
    </div>
  );
}
