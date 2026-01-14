import { LoginForm } from 'wasp/client/auth';
import { Link } from 'wasp/client/router';
import logo from '../../../assets/logo_fruveg.svg';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <img src={logo} alt="Fruveg" className="h-20 mx-auto mb-4" />
          <p className="text-gray-600">Melden Sie sich bei Ihrem Konto an</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Sie haben noch kein Konto?{' '}
            <Link to="/signup" className="text-green-600 hover:text-green-800 font-semibold">
              Registrieren
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
