import { useState } from "react";
import { 
  ShipWheelIcon, 
  GlobeIcon, 
  CompassIcon, 
  ArrowLeftIcon,
  KeyIcon,
  MailIcon,
  CheckCircleIcon
} from "lucide-react";
import { Link } from "react-router";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Replace this with your actual forgot password API call
      // const response = await forgotPasswordAPI(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsEmailSent(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      // Resend logic here
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (err) {
      setError("Failed to resend email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-orange-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-16 text-orange-300/20 animate-bounce" style={{animationDelay: '1s'}}>
          <KeyIcon size={40} />
        </div>
        <div className="absolute top-32 right-20 text-blue-300/20 animate-bounce" style={{animationDelay: '3s'}}>
          <MailIcon size={35} />
        </div>
        <div className="absolute bottom-32 left-12 text-purple-300/20 animate-bounce" style={{animationDelay: '2s'}}>
          <CompassIcon size={38} />
        </div>
        <div className="absolute bottom-20 right-16 text-pink-300/20 animate-bounce" style={{animationDelay: '4s'}}>
          <ShipWheelIcon size={32} />
        </div>
      </div>

      <div className="w-full max-w-md mx-auto bg-gray-900/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 lg:p-8">
          {/* Back Button */}
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium mb-6 group transition-colors duration-300"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Login
          </Link>

          {/* LOGO */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <img
                src="/talki.png"
                alt="Talki Logo"
                className="relative h-12 w-12 drop-shadow-xl"
              />
            </div>
            <span className="text-4xl font-black bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent tracking-tight">
              Talk<span className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">i</span>
            </span>
          </div>

          {!isEmailSent ? (
            <>
              {/* Header */}
              <div className="mb-6 text-center">
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                  Lost Your Way,{' '}
                  <span className="bg-gradient-to-r from-orange-400 to-blue-700 bg-clip-text text-transparent">
                    Explorer?
                  </span>
                  <span className="inline-block ml-1 text-lg">🧭</span>
                </h1>
                <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                  No worries! We'll help you get back on track with a password reset link.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-rose-400/30 to-red-500/20 rounded-lg blur-sm opacity-75"></div>
                  <div className="relative p-3 bg-gradient-to-br from-red-950/40 via-red-900/30 to-rose-950/40 backdrop-blur-xl border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                      </div>
                      <p className="text-red-100/90 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="group">
                  <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
                    <GlobeIcon className="h-4 w-4 text-orange-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="adventure@talki.com"
                    className="w-full px-4 py-3 text-base bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 hover:bg-white/15"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 px-6 text-base font-bold text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 rounded-xl shadow-xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group relative overflow-hidden" 
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Magic Link...
                    </>
                  ) : (
                    <>
                      <MailIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-400/30 animate-pulse">
                  <CheckCircleIcon className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                  Check Your Inbox! 
                  <span className="inline-block ml-1 text-lg">📧</span>
                </h1>
                <p className="text-sm lg:text-base text-gray-300 leading-relaxed mb-4">
                  We've sent a password reset link to:
                </p>
                <p className="text-base font-semibold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                  {email}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl">
                  <p className="text-sm text-blue-100 leading-relaxed">
                    <strong>Pro Tip:</strong> Check your spam folder if you don't see the email within a few minutes. The adventure must go on! 🚀
                  </p>
                </div>

                <button 
                  onClick={handleResendEmail}
                  className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-lg transition-all duration-300 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Resending...
                    </div>
                  ) : (
                    "Didn't receive it? Resend email"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{' '}
              <Link 
                to="/login" 
                className="font-semibold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent hover:from-orange-300 hover:to-pink-300 transition-all duration-300"
              >
                Back to Login →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;