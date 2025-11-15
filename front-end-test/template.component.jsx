import React, { useState } from 'react';
import { Mail, Eye, EyeOff, AlertCircle, Check, ArrowLeft, HelpCircle, Globe } from 'lucide-react';

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [email, setEmail] = useState('');
  const [savedAccounts, setSavedAccounts] = useState([
    { email: 'demo@example.com', name: 'Demo User', avatar: 'D' }
  ]);

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <LoginPage onNext={(email) => { setEmail(email); setCurrentPage('password'); }} 
                          onCreateAccount={() => setCurrentPage('signup')}
                          savedAccounts={savedAccounts}
                          onSelectAccount={(acc) => { setEmail(acc.email); setCurrentPage('password'); }} />;
      case 'password':
        return <PasswordPage email={email} onBack={() => setCurrentPage('login')} 
                            onForgot={() => setCurrentPage('forgot')} />;
      case 'signup':
        return <SignupPage onBack={() => setCurrentPage('login')} />;
      case 'forgot':
        return <ForgotPasswordPage onBack={() => setCurrentPage('login')} />;
      case '2fa':
        return <TwoFactorPage onBack={() => setCurrentPage('password')} />;
      default:
        return <LoginPage onNext={(email) => { setEmail(email); setCurrentPage('password'); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {renderPage()}
    </div>
  );
}

// Login Page Component
function LoginPage({ onNext, onCreateAccount, savedAccounts, onSelectAccount }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showAccounts, setShowAccounts] = useState(savedAccounts.length > 0);

  const handleNext = () => {
    if (!email) {
      setError('Enter an email or phone number');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email');
      return;
    }
    setError('');
    onNext(email);
  };

  if (showAccounts && savedAccounts.length > 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <GoogleLogo />
            <h1 className="text-2xl mt-4 text-gray-800">Choose an account</h1>
            <p className="text-sm text-gray-600 mt-2">to continue to Google</p>
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {savedAccounts.map((account, idx) => (
              <button
                key={idx}
                onClick={() => onSelectAccount(account)}
                className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium mr-3">
                  {account.avatar}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-800">{account.name}</div>
                  <div className="text-sm text-gray-600">{account.email}</div>
                </div>
              </button>
            ))}
            
            <button
              onClick={() => setShowAccounts(false)}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                <span className="text-gray-600 text-xl">+</span>
              </div>
              <div className="text-gray-600 font-medium">Use another account</div>
            </button>
          </div>

          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <GoogleLogo />
          <h1 className="text-2xl mt-4 text-gray-800">Sign in</h1>
          <p className="text-sm text-gray-600 mt-2">to continue to Google</p>
        </div>

        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            onKeyPress={(e) => e.key === 'Enter' && handleNext()}
            placeholder="Email or phone"
            className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          />
          {error && (
            <div className="flex items-center mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </div>
          )}
          <button className="text-blue-600 text-sm mt-3 hover:underline font-medium">
            Forgot email?
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Not your computer? Use Guest mode to sign in privately.{' '}
          <button className="text-blue-600 hover:underline font-medium">Learn more</button>
        </p>

        <div className="flex justify-between items-center">
          <button 
            onClick={onCreateAccount}
            className="text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded transition-colors"
          >
            Create account
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
          >
            Next
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// Password Page Component
function PasswordPage({ email, onBack, onForgot }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!password) {
      setError('Enter a password');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Login successful! (This is a demo)');
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <GoogleLogo />
          <h1 className="text-2xl mt-4 text-gray-800">Welcome</h1>
          
          <div className="flex items-center justify-center mt-4 bg-gray-100 rounded-full px-4 py-2 max-w-xs mx-auto">
            <Mail className="w-4 h-4 text-gray-600 mr-2" />
            <span className="text-sm text-gray-800 truncate">{email}</span>
            <button onClick={onBack} className="ml-2 text-blue-600 text-xs hover:underline">
              Switch
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyPress={(e) => e.key === 'Enter' && handleNext()}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 transition-all`}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {error && (
            <div className="flex items-center mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </div>
          )}
          <button 
            onClick={onForgot}
            className="text-blue-600 text-sm mt-3 hover:underline font-medium"
          >
            Forgot password?
          </button>
        </div>

        <div className="flex items-center mb-6">
          <input type="checkbox" id="show-password" className="mr-2" />
          <label htmlFor="show-password" className="text-sm text-gray-700 cursor-pointer">
            Show password
          </label>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </>
            ) : 'Next'}
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// Signup Page Component
function SignupPage({ onBack }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const checkPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
    if (field === 'password') checkPasswordStrength(value);
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    alert('Account created successfully! (This is a demo)');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <GoogleLogo />
          <h1 className="text-2xl mt-4 text-gray-800">Create your Google Account</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="First name"
              className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Last name"
              className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="mb-4">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Email"
            className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          <p className="text-xs text-gray-600 mt-2">You can use letters, numbers & periods</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Password"
                className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded ${
                        level <= passwordStrength
                          ? passwordStrength === 1
                            ? 'bg-red-500'
                            : passwordStrength === 2
                            ? 'bg-yellow-500'
                            : passwordStrength === 3
                            ? 'bg-blue-500'
                            : 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Use 8 or more characters with a mix of letters, numbers & symbols
                </p>
              </div>
            )}
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="Confirm"
              className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input 
            type="checkbox" 
            id="show-pwd" 
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2" 
          />
          <label htmlFor="show-pwd" className="text-sm text-gray-700 cursor-pointer">
            Show password
          </label>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded transition-colors"
          >
            Sign in instead
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
          >
            Next
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// Forgot Password Page Component
function ForgotPasswordPage({ onBack }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl text-gray-800 mb-2">Check your email</h1>
          <p className="text-gray-600 mb-6">
            We've sent password reset instructions to <strong>{email}</strong>
          </p>
          <button
            onClick={onBack}
            className="text-blue-600 font-medium hover:underline"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl text-gray-800 mb-2">Reset your password</h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors font-medium"
        >
          Send reset link
        </button>
      </div>
    </div>
  );
}

// Two Factor Page Component
function TwoFactorPage({ onBack }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = React.useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <GoogleLogo />
          <h1 className="text-2xl mt-4 text-gray-800">2-Step Verification</h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <button className="text-blue-600 text-sm hover:underline">
            Try another way
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded transition-colors"
          >
            Back
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-medium">
            Verify
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// Reusable Components
function GoogleLogo() {
  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 75 24" width="75" height="24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path d="M41.98 10.683v3.887h5.428a4.755 4.755 0 01-2.063 3.13l3.345 2.594c1.953-1.8 3.078-4.455 3.078-7.6 0-.733-.067-1.44-.19-2.117l-9.598.106z" fill="#4285F4"/>
          <path d="M26.3 12.21c0-.795.142-1.56.4-2.28l-3.556-2.76A11.723 11.723 0 0021.5 12.21c0 2.063.533 3.998 1.467 5.68l3.556-2.76a6.982 6.982 0 01-.223-2.92z" fill="#FBBC05"/>
          <path d="M41.98 6.69c1.778 0 3.373.61 4.627 1.812l3.467-3.467C47.995 3.06 45.223 1.71 41.98 1.71c-4.467 0-8.267 2.51-10.18 6.183l3.556 2.76c.845-2.535 3.245-4.354 6.067-4.354l.557-.61z" fill="#EA4335"/>
          <path d="M32.356 15.89l-3.556 2.76c1.913 3.672 5.713 6.183 10.18 6.183 3.11 0 5.712-1.023 7.623-2.783l-3.345-2.594c-.935.628-2.135.995-3.845.995-2.956 0-5.467-1.995-6.356-4.678l.3.117z" fill="#34A853"/>
          <path d="M9.927 12.21c0-.862.145-1.695.417-2.475L6.79 7.17A11.83 11.83 0 005.5 12.21c0 1.89.445 3.675 1.234 5.257l3.556-2.565a7.024 7.024 0 01-.363-2.693z" fill="#FBBC05"/>
          <path d="M9.927 7.665c1.89 0 3.59.65 4.923 1.928l3.69-3.69C16.373 3.815 13.412 2.42 9.927 2.42 5.99 2.42 2.634 4.642.79 7.858l3.556 2.565C5.24 8.558 7.412 7.665 9.927 7.665z" fill="#EA4335"/>
          <path d="M9.927 16.756c-2.515 0-4.687-.894-5.58-2.758L.79 16.563c1.844 3.216 5.2 5.437 9.137 5.437 3.323 0 6.128-1.095 8.173-2.97l-3.69-2.863c-1.01.673-2.302 1.07-3.84 1.07l-.643.52z" fill="#34A853"/>
        </g>
      </svg>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-gray-800">
            <Globe className="w-4 h-4" />
            English (United States)
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-800">Help</button>
          <button className="hover:text-gray-800">Privacy</button>
          <button className="hover:text-gray-800">Terms</button>
        </div>
      </div>
    </footer>
  );
}
