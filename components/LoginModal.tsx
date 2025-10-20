import React, { useState } from 'react';

interface LoginModalProps {
  onLogin: (password: string) => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      onLogin(password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-xl shadow-xl w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-primary">Admin Login</h3>
                <button 
                    onClick={onClose} 
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>
            </div>
        </div>
        <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3" 
                  placeholder="Masukkan password..."
                  autoFocus
                />
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                  Login
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;