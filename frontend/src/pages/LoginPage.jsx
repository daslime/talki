import { useState } from "react";
import { 
  ShipWheelIcon, 
  GlobeIcon, 
  MapIcon, 
  CompassIcon, 
  StarIcon,
  RocketIcon,
  HeartIcon,
  ZapIcon 
} from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-orange-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-16 text-orange-300/20 animate-bounce" style={{animationDelay: '1s'}}>
          <GlobeIcon size={40} />
        </div>
        <div className="absolute top-32 right-20 text-blue-300/20 animate-bounce" style={{animationDelay: '3s'}}>
          <RocketIcon size={35} />
        </div>
        <div className="absolute bottom-32 left-12 text-purple-300/20 animate-bounce" style={{animationDelay: '2s'}}>
          <StarIcon size={38} />
        </div>
        <div className="absolute bottom-20 right-16 text-pink-300/20 animate-bounce" style={{animationDelay: '4s'}}>
          <HeartIcon size={32} />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-gray-900/10 backdrop-blur-xl border border-white/20 flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden">
        
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-12 flex flex-col justify-center relative">
          <div className="w-full max-w-sm lg:max-w-md mx-auto lg:mx-0">
            {/* LOGO */}
            <div className="mb-4 flex items-center justify-center lg:justify-start gap-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <img
                  src="/talki.png"
                  alt="Talki Logo"
                  className="relative h-10 w-10 lg:h-12 lg:w-12 drop-shadow-xl"
                />
              </div>
              <span className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent tracking-tight">
                Talk<span className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">i</span>
              </span>
            </div>

            {/* Welcome Section */}
            <div className="mb-4 lg:mb-6 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 leading-tight">
                Welcome Back,{' '}
                <span className="bg-gradient-to-r from-orange-400 to-blue-700 bg-clip-text text-transparent">
                  Explorer!
                </span>
                <span className="inline-block ml-1 text-lg">🚀</span>
              </h1>
              <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                Continue your language adventure
              </p>
            </div>

            {/* Language Skills */}
            <div className="grid grid-cols-3 gap-2 lg:gap-3 mb-4 lg:mb-6">
              <div className="relative text-center p-1.5 lg:p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-1 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-md flex items-center justify-center shadow-lg group-hover:shadow-blue-400/30 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                  </div>
                  <div className="text-blue-400 font-semibold text-xs lg:text-sm">Read</div>
                  <div className="text-xs lg:text-sm text-gray-300">& Learn</div>
                </div>
              </div>

              <div className="relative text-center p-1.5 lg:p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-1 bg-gradient-to-br from-green-400 to-emerald-500 rounded-md flex items-center justify-center shadow-lg group-hover:shadow-green-400/30 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                  </div>
                  <div className="text-green-400 font-semibold text-xs lg:text-sm">Speak</div>
                  <div className="text-xs lg:text-sm text-gray-300">& Express</div>
                </div>
              </div>

              <div className="relative text-center p-1.5 lg:p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-1 bg-gradient-to-br from-purple-400 to-pink-500 rounded-md flex items-center justify-center shadow-lg group-hover:shadow-purple-400/30 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.1-.9-2-2-2s-2 .9-2 2c0 1.1.9 2 2 2s2-.9 2-2zM6 2C4.9 2 4 2.9 4 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zM19 7h-8l-2.5 3.5L7.91 8H6l1.91 2.84L6 13h1.91l.59-.84L10 14.5l2.5-3.5H19V7z"/>
                      <circle cx="12" cy="18" r="2"/>
                      <circle cx="6" cy="18" r="2"/>
                      <circle cx="18" cy="18" r="2"/>
                    </svg>
                  </div>
                  <div className="text-purple-400 font-semibold text-xs lg:text-sm">Connect</div>
                  <div className="text-xs lg:text-sm text-gray-300">& Learn</div>
                </div>
              </div>
            </div>

            {/* ULTRA MODERN ERROR MESSAGE DISPLAY */}
            {error && (
              <div className="mb-3 lg:mb-4 relative group">
                {/* Background animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-rose-400/30 to-red-500/20 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Error card */}
                <div className="relative p-3 lg:p-4 bg-gradient-to-br from-red-950/40 via-red-900/30 to-rose-950/40 backdrop-blur-xl border border-red-500/20 rounded-lg shadow-lg overflow-hidden">
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

            <form onSubmit={handleLogin} className="space-y-3 lg:space-y-4">
              <div className="space-y-3 lg:space-y-4">
                <div className="group">
                  <label className=" text-xs lg:text-sm font-semibold text-gray-300 mb-1 lg:mb-2 flex items-center gap-1">
                    <GlobeIcon className="h-3 w-3 lg:h-4 lg:w-4 text-orange-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="adventure@talki.com"
                    className="w-full px-3 py-2.5 lg:px-4 lg:py-3 text-sm lg:text-base bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl text-white placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 hover:bg-white/15"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="group">
                  <label className=" text-xs lg:text-sm font-semibold text-gray-300 mb-1 lg:mb-2 flex items-center gap-1">
                    <CompassIcon className="h-3 w-3 lg:h-4 lg:w-4 text-blue-400" />
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2.5 lg:px-4 lg:py-3 text-sm lg:text-base bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-2.5 px-4 lg:py-3 lg:px-6 text-sm lg:text-base font-bold text-white bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 hover:from-orange-600 hover:via-green-600 hover:to-blue-600 rounded-lg lg:rounded-xl shadow-xl hover:shadow-slate-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group relative overflow-hidden" 
                  disabled={isPending}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Launching...
                    </>
                  ) : (
                    <>
                      <ShipWheelIcon className="h-4 w-4 lg:h-5 lg:w-5 group-hover:rotate-180 transition-transform duration-500" />
                      Start Adventure
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 lg:mt-6 text-center">
              <p className="text-xs lg:text-sm text-gray-400">
                New to the adventure?{' '}
                <Link 
                  to="/signup" 
                  className="font-semibold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent hover:from-orange-300 hover:to-pink-300 transition-all duration-300"
                >
                  Join the Quest →
                </Link>
              </p>
           <p className="text-xs lg:text-sm text-gray-400 text-center mt-4">
  <span className="inline-block mr-1">Trouble logging in?</span>
  <Link 
    to="/ForgotPassword" 
    className="inline-flex items-center gap-1 font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-300"
  >
    Reset it <span className="text-base">🔑</span>
  </Link>
</p>

  
              
  
            </div>
          </div>
        </div>
        

        {/* HERO SECTION - Hidden on mobile/tablet */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-orange-500 via-black-500 to-green-600 items-center justify-center p-8 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-16 left-16 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-12 w-16 h-16 bg-yellow-300/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-24 left-12 w-20 h-20 bg-purple-300/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-32 right-16 w-12 h-12 bg-cyan-300/20 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            
            {/* Floating Language Elements */}
            <div className="absolute top-12 right-24 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-bold text-sm z-20">
              🇪🇸 Hola!
            </div>

            <div className="absolute top-48 left-8 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-bold text-sm z-20">
              🇫🇷 Bonjour!
            </div>

            <div className="absolute bottom-16 right-6 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-bold text-sm z-20">
              🇯🇵 こんにちは
            </div>
          </div>

          <div className="relative z-10 max-w-sm text-center text-white">
            {/* Main Illustration */}
            <div className="relative mb-8 group">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="/yea.png" 
                  alt="Language Learning Adventure" 
                  className="w-full h-full object-contain drop-shadow-2xl" 
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold leading-tight">
                Embark on the Ultimate
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text ">
                  Language Adventure! 🌍
                </span>
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Connect with passionate learners worldwide, practice through immersive video calls, and transform learning into an epic journey.
              </p>
              
              <p className="text-sm text-white/90 font-medium italic leading-relaxed">
                "Where ‘bonjour’ meets ‘bro, what?’ — language learning the fun way."
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-xs font-semibold bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-transparent">
                  -Brian, The Explorer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;