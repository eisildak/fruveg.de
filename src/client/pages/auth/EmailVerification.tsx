import { VerifyEmailForm } from 'wasp/client/auth';
import { Link } from 'wasp/client/router';

export default function EmailVerification() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">E-Mail Bestätigung</h1>
          <p className="text-gray-600">Bestätigen Sie Ihre E-Mail-Adresse</p>
        </div>

        <VerifyEmailForm />

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
