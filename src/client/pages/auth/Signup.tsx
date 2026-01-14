import { SignupForm } from 'wasp/client/auth';
import { Link } from 'wasp/client/router';

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🥬 Fruveg Market</h1>
          <p className="text-gray-600">Neues Konto erstellen</p>
        </div>

        <SignupForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Sie haben bereits ein Konto?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-800 font-semibold">
              Anmelden
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
