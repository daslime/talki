import { useState } from "react";
import { 
  ShipWheelIcon, 
  GlobeIcon, 
  UserPlusIcon, 
  SparklesIcon, 
  StarIcon,
  RocketIcon,
  HeartIcon,
  ZapIcon,
  UserIcon,
  MailIcon,
  LockIcon,
  CheckCircleIcon,
  MapIcon,
  CompassIcon
} from "lucide-react";
import { Link } from "react-router";

import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-orange-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Icons - Hidden on small screens */}
        <div className="hidden lg:block absolute top-20 left-16 text-orange-300/20 animate-bounce" style={{animationDelay: '1s'}}>
          <GlobeIcon size={40} />
        </div>
        <div className="hidden lg:block absolute top-32 right-20 text-blue-300/20 animate-bounce" style={{animationDelay: '3s'}}>
          <RocketIcon size={35} />
        </div>
        <div className="hidden lg:block absolute bottom-32 left-12 text-purple-300/20 animate-bounce" style={{animationDelay: '2s'}}>
          <StarIcon size={38} />
        </div>
        <div className="hidden lg:block absolute bottom-20 right-16 text-pink-300/20 animate-bounce" style={{animationDelay: '4s'}}>
          <HeartIcon size={32} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT SIDE - Hero Section - Hidden on small screens, visible on large screens */}
        <div className="hidden lg:block w-full lg:w-2/5 relative overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/talisignup.png')",
              filter: 'brightness(0.4) contrast(1.2)'
            }}
          ></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-purple-600/10 to-blue-600/20"></div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center p-6 lg:p-12 h-full min-h-[40vh] lg:min-h-screen">
            {/* Animated Icons */}
            <div className="absolute inset-0">
              <SparklesIcon className="absolute top-12 left-8 w-6 h-6 text-white/30 animate-twinkle" />
              <StarIcon className="absolute top-20 right-12 w-8 h-8 text-yellow-300/40 animate-pulse" />
              <HeartIcon className="absolute bottom-24 left-12 w-7 h-7 text-pink-300/40 animate-bounce" />
              <ZapIcon className="absolute bottom-16 right-8 w-6 h-6 text-blue-300/40 animate-twinkle" style={{animationDelay: '1s'}} />
              
              {/* Floating Language Elements */}
              <div className="absolute top-16 right-24 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-bold text-sm">
                🇪🇸 Hola!
              </div>
              <div className="absolute top-48 left-8 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-bold text-sm">
                🇫🇷 Bonjour!
              </div>
              <div className="absolute bottom-32 right-6 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-bold text-sm">
                🇯🇵 こんにちは
              </div>
            </div>

            <div className="relative z-10 text-center text-white max-w-md">
              {/* Logo Section */}
              <div className="mb-6 lg:mb-8">
                <div className="relative inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mb-4">
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-3 lg:p-4 border border-white/30">
                    <img
                      src="/talki.png"
                      alt="Talki Logo"
                      className="w-10 h-10 lg:w-12 lg:h-12 drop-shadow-xl"
                    />
                  </div>
                </div>
                <h1 className="text-2xl lg:text-4xl font-black mb-2">
                  <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    Join the
                  </span>
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent tracking-tight">
                    Talk
                  </span>
                  <span className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
                    i
                  </span>
                  <span className="text-2xl lg:text-3xl">🚀</span>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 gap-4 mb-6 lg:mb-8">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <GlobeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="font-bold text-lg">Global Community</h3>
                    <p className="text-sm text-white/80">Connect worldwide</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <RocketIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="font-bold text-lg">Fast Progress</h3>
                    <p className="text-sm text-white/80">Learn efficiently</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="font-bold text-lg">Make Friends</h3>
                    <p className="text-sm text-white/80">Build connections</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium text-white/90 italic">
                  "We speak emoji too 😎🌍"
                </p>
                <div className="flex justify-center items-center gap-1 mt-2">
                 
                  <span className="ml-2 text-sm text-white/70">Your accent is part of the charm 😅💬</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Signup Form - Full width on small screens, 3/5 width on large screens */}
        <div className="w-full lg:w-3/5 bg-gray-900/10 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-12 min-h-screen">
          <div className="w-full max-w-md lg:max-w-lg">
            
            {/* Form Header */}
            <div className="text-center mb-6 lg:mb-8">
              {/* Logo - Always visible on small screens, hidden on large screens */}
              <div className="lg:hidden mb-6 flex flex-col items-center">
                <div className="relative group mb-4">
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/30">
                    <img
                      src="/talki.png"
                      alt="Talki Logo"
                      className="relative h-12 w-12 drop-shadow-xl"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-black bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent tracking-tight">
                    Talk
                  </span>
                  <span className="text-4xl font-black bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
                    i
                  </span>
                  <span className="text-3xl">🚀</span>
                </div>
                <p className="text-white/80 text-sm mt-2">Join 50,000+ language explorers!</p>
              </div>

              <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-blue-500 rounded-xl lg:rounded-2xl mb-4 shadow-xl">
                <UserPlusIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-300 text-sm lg:text-lg">
                Start your language journey today
              </p>
            </div>

            {/* Progress Steps - Responsive */}
            <div className="flex items-center justify-center gap-1 lg:gap-2 mb-6 lg:mb-8 overflow-x-auto">
              <div className="flex items-center gap-1 lg:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2 lg:px-4 py-1 lg:py-2 border border-white/20 flex-shrink-0">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs lg:text-sm">1</div>
                <span className="text-white font-medium text-xs lg:text-sm whitespace-nowrap">Sign Up</span>
              </div>
              <div className="w-4 lg:w-8 h-px bg-gradient-to-r from-orange-400 to-transparent flex-shrink-0"></div>
              <div className="flex items-center gap-1 lg:gap-2 bg-white/5 backdrop-blur-sm rounded-full px-2 lg:px-4 py-1 lg:py-2 border border-white/10 flex-shrink-0">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center text-white/60 font-bold text-xs lg:text-sm">2</div>
                <span className="text-white/60 font-medium text-xs lg:text-sm whitespace-nowrap">Setup</span>
              </div>
              <div className="w-4 lg:w-8 h-px bg-gradient-to-r from-white/20 to-transparent flex-shrink-0"></div>
              <div className="flex items-center gap-1 lg:gap-2 bg-white/5 backdrop-blur-sm rounded-full px-2 lg:px-4 py-1 lg:py-2 border border-white/10 flex-shrink-0">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center text-white/60 font-bold text-xs lg:text-sm">3</div>
                <span className="text-white/60 font-medium text-xs lg:text-sm whitespace-nowrap">Start</span>
              </div>
            </div>

            {/* ERROR MESSAGE - Modern Design */}
            {error && (
              <div className="mb-4 lg:mb-6 relative group">
                {/* Background animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-rose-400/30 to-red-500/20 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Error card */}
                <div className="relative p-3 lg:p-4 bg-gradient-to-br from-red-950/40 via-red-900/30 to-rose-950/40 backdrop-blur-xl border border-red-500/20 rounded-xl shadow-lg overflow-hidden">
                  <div className="flex items-start gap-3">
                    {/* Icon with pulse */}
                    <div className="relative flex-shrink-0">
                      <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-red-400 via-rose-500 to-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-500/40">
                        <svg
                          className="w-3 h-3 lg:w-4 lg:h-4 text-white animate-pulse"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 rounded-lg border-2 border-red-400/50 animate-ping"></div>
                    </div>

                    {/* Message text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-red-300 font-bold text-xs lg:text-sm tracking-wider uppercase">Error</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-red-400/50 to-transparent"></div>
                      </div>
                      <p className="text-red-100/90 text-xs lg:text-sm font-medium leading-relaxed">
                        {error?.response?.data?.message || 'Something unexpected happened. Please try again.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4 lg:space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base">
                  <UserIcon className="w-4 h-4 lg:w-5 lg:h-5 text-orange-400" />
                  Full Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-3 lg:px-4 lg:py-3 text-sm lg:text-base text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 group-hover:bg-white/15"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                  />
                  <div className="absolute inset-0 rounded-lg lg:rounded-xl border border-orange-400/0 group-focus-within:border-orange-400/50 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base">
                  <MailIcon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-3 py-3 lg:px-4 lg:py-3 text-sm lg:text-base text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 group-hover:bg-white/15"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                  <div className="absolute inset-0 rounded-lg lg:rounded-xl border border-blue-400/0 group-focus-within:border-blue-400/50 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base">
                  <LockIcon className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                  Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    className="w-full px-3 py-3 lg:px-4 lg:py-3 text-sm lg:text-base text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 group-hover:bg-white/15"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                  <div className="absolute inset-0 rounded-lg lg:rounded-xl border border-purple-400/0 group-focus-within:border-purple-400/50 transition-all duration-300 pointer-events-none"></div>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Must be at least 6 characters long
                </p>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 p-3 lg:p-4 bg-white/5 backdrop-blur-sm rounded-lg lg:rounded-xl border border-white/10">
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 lg:w-5 lg:h-5 rounded border-2 border-white/30 bg-white/10 text-orange-500 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300" 
                  required 
                />
                <div className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                  I agree to the{" "}
                  <span className="text-orange-400 hover:text-orange-300 cursor-pointer font-semibold underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold underline">
                    Privacy Policy
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full py-4 px-4 lg:py-4 lg:px-6 text-base lg:text-lg font-bold text-white bg-gradient-to-r from-orange-500 via-purple-600 to-blue-500 hover:from-orange-600 hover:via-purple-700 hover:to-blue-600 rounded-lg lg:rounded-xl shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 lg:gap-3 group relative overflow-hidden" 
                disabled={isPending}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                {isPending ? (
                  <>
                    <div className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform duration-300" />
                    Join Talki Now
                    <SparklesIcon className="h-4 w-4 lg:h-5 lg:w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 lg:mt-8 text-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="text-gray-400 text-xs lg:text-sm">Already have an account?</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg lg:rounded-xl text-white font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 group text-sm lg:text-base"
              >
                <ShipWheelIcon className="h-4 w-4 lg:h-5 lg:w-5 group-hover:rotate-180 transition-transform duration-500" />
                Sign In Instead
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;