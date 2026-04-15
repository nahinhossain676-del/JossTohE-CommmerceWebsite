import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

function getUsers() {
  try {
    const u = localStorage.getItem('jt_users');
    return u ? JSON.parse(u) : [];
  } catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem('jt_users', JSON.stringify(users));
}

export default function AuthModal({ open, mode, onClose, onLogin, onSwitchMode }) {
  const [form, setForm] = useState({ name: '', identifier: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  }

  function handleRegister(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.identifier.trim() || !form.password.trim()) {
      setError('All fields are required');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const users = getUsers();
    if (users.find(u => u.identifier === form.identifier)) {
      setError('Account already exists with this email/phone');
      return;
    }
    const newUser = { name: form.name.trim(), identifier: form.identifier.trim(), password: form.password };
    saveUsers([...users, newUser]);
    onLogin({ name: newUser.name, identifier: newUser.identifier });
    setForm({ name: '', identifier: '', password: '' });
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!form.identifier.trim() || !form.password.trim()) {
      setError('All fields are required');
      return;
    }
    const users = getUsers();
    const user = users.find(u => u.identifier === form.identifier && u.password === form.password);
    if (!user) {
      setError('Invalid email/phone or password');
      return;
    }
    onLogin({ name: user.name, identifier: user.identifier });
    setForm({ name: '', identifier: '', password: '' });
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-[61] flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md shadow-2xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
            <h2 className="text-white font-bold text-lg">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h2>
            <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="px-6 py-6 flex flex-col gap-4">
            {mode === 'register' && (
              <div>
                <label className="text-zinc-400 text-xs uppercase tracking-widest mb-1.5 block">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-400 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-zinc-600"
                />
              </div>
            )}
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-1.5 block">Email or Phone</label>
              <input
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                placeholder="email@example.com or 01XXXXXXXXX"
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-400 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-zinc-600"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-400 text-white px-4 py-3 pr-10 text-sm outline-none transition-colors placeholder-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-900/20 border border-red-900/40 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black py-3.5 text-sm tracking-widest uppercase transition-all duration-200 active:scale-95 mt-1"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <p className="text-center text-zinc-500 text-sm">
              {mode === 'login' ? (
                <>
                  No account?{' '}
                  <button type="button" onClick={() => { onSwitchMode('register'); setError(''); setForm({ name: '', identifier: '', password: '' }); }} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => { onSwitchMode('login'); setError(''); setForm({ name: '', identifier: '', password: '' }); }} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                    Sign In
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
