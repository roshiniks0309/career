import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogleAndSave } from '../../lib/firebase';

export const GoogleButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      // src/components/Auth/GoogleButton.tsx (only the success part changed)
      const user = await signInWithGoogleAndSave();

      const currentUser = {
        id: user.uid,
        email: user.email ?? '',
        name: user.displayName ?? '',
        role: 'student',
        locale: 'en',
        district: '',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Go straight to dashboard; no full reload needed
      navigate('/dashboard');

      // Soft reload so AuthContext sees localStorage
      setTimeout(() => window.location.reload(), 200);

    } catch (e: any) {
      setError(e?.message ?? 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleGoogle}
        className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-2 py-2"
        style={{ borderRadius: 8 }}
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google Logo"
          width="18"
          height="18"
        />
        {loading ? 'Signing in...' : 'Continue with Google'}
      </button>
      {error && <p className="text-danger mt-2 small">{error}</p>}
    </div>
  );
};
