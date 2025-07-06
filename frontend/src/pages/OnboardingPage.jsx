import { useState, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { 
  LoaderIcon, 
  MapPinIcon, 
  ShipWheelIcon, 
  ShuffleIcon, 
  UserIcon,
  MessageSquareIcon,
  GlobeIcon,
  BookOpenIcon,
  SparklesIcon,
  CheckCircleIcon,
  HeartIcon,
  StarIcon,
  RocketIcon
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  // Load random avatar on component mount if no profile pic exists
  useEffect(() => {
    if (!formState.profilePic) {
      handleRandomAvatar();
    }
  }, []);

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const styles = ['adventurer', 'avataaars', 'big-ears', 'big-smile', 'croodles', 'fun-emoji', 'icons', 'initials', 'lorelei', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = Math.random().toString(36).substring(7);
    const randomAvatar = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("New avatar generated!");
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
              backgroundImage: "url('/onboarding.png')",
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
                    Complete Your
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
                <p className="text-lg font-black bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                  Profile
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 gap-4 mb-6 lg:mb-8">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="font-bold text-lg">Personal Profile</h3>
                    <p className="text-sm text-white/80">Tell us about yourself</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <BookOpenIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="font-bold text-lg">Language Goals</h3>
                    <p className="text-sm text-white/80">Set your learning path</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <GlobeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="font-bold text-lg">Global Connect</h3>
                    <p className="text-sm text-white/80">Join the community</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium text-white/90 italic">
                  "Almost there! Just a few more steps..."
                </p>
                <div className="flex justify-center items-center gap-1 mt-2">
                
                  <span className="ml-2 text-sm text-white/70">"A journey of a thousand miles begins with a single step" - Lao Tzu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Onboarding Form - Full width on small screens, 3/5 width on large screens */}
        <div className="w-full lg:w-3/5 bg-gray-900/10 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-12 min-h-screen">
          <div className="w-full max-w-md lg:max-w-2xl">
            
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
                <p className="text-white/80 text-sm mt-2">Complete your profile setup</p>
              </div>

              <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-blue-500 rounded-xl lg:rounded-2xl mb-4 shadow-xl">
                <UserIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2">
                Complete Your Profile
              </h2>
              <p className="text-gray-300 text-sm lg:text-lg">
                Let's personalize your language learning journey
              </p>
            </div>

            {/* Progress Steps - Responsive */}
            <div className="flex items-center justify-center gap-1 lg:gap-2 mb-6 lg:mb-8 overflow-x-auto">
              <div className="flex items-center gap-1 lg:gap-2 bg-white/5 backdrop-blur-sm rounded-full px-2 lg:px-4 py-1 lg:py-2 border border-white/10 flex-shrink-0">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center text-white/60 font-bold text-xs lg:text-sm">
                  <CheckCircleIcon className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
                </div>
                <span className="text-white/60 font-medium text-xs lg:text-sm whitespace-nowrap">Sign Up</span>
              </div>
              <div className="w-4 lg:w-8 h-px bg-gradient-to-r from-green-400 to-orange-400 flex-shrink-0"></div>
              <div className="flex items-center gap-1 lg:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2 lg:px-4 py-1 lg:py-2 border border-white/20 flex-shrink-0">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs lg:text-sm">2</div>
                <span className="text-white font-medium text-xs lg:text-sm whitespace-nowrap">Setup</span>
              </div>
              <div className="w-4 lg:w-8 h-px bg-gradient-to-r from-orange-400 to-transparent flex-shrink-0"></div>
              <div className="flex items-center gap-1 lg:gap-2 bg-white/5 backdrop-blur-sm rounded-full px-2 lg:px-4 py-1 lg:py-2 border border-white/10 flex-shrink-0">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center text-white/60 font-bold text-xs lg:text-sm">3</div>
                <span className="text-white/60 font-medium text-xs lg:text-sm whitespace-nowrap">Start</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              {/* PROFILE PIC CONTAINER */}
              <div className="flex flex-col items-center justify-center space-y-4 p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-white/10">
                <div className="text-center mb-2">
                  <h3 className="text-white font-semibold text-lg lg:text-xl mb-1">Profile Picture</h3>
                  <p className="text-gray-400 text-sm">Choose your avatar</p>
                </div>
                
                {/* IMAGE PREVIEW */}
                <div className="relative group">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/20 overflow-hidden shadow-xl">
                    {formState.profilePic ? (
                      <img
                        src={formState.profilePic}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <UserIcon className="w-8 h-8 lg:w-12 lg:h-12 text-white/40" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-orange-400/0 group-hover:border-orange-400/50 transition-all duration-300"></div>
                </div>

                {/* Generate Random Avatar BTN */}
                <button 
                  type="button" 
                  onClick={handleRandomAvatar} 
                  className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg lg:rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <ShuffleIcon className="w-4 h-4 lg:w-5 lg:h-5 group-hover:rotate-180 transition-transform duration-300" />
                  <span className="text-sm lg:text-base">Generate New Avatar</span>
                </button>
              </div>

              {/* FULL NAME */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base">
                  <UserIcon className="w-4 h-4 lg:w-5 lg:h-5 text-orange-400" />
                  Full Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="fullName"
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    className="w-full px-3 py-3 lg:px-4 lg:py-3 text-sm lg:text-base text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 group-hover:bg-white/15"
                    placeholder="Enter your full name"
                    required
                  />
                  <div className="absolute inset-0 rounded-lg lg:rounded-xl border border-orange-400/0 group-focus-within:border-orange-400/50 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* BIO */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base">
                  <MessageSquareIcon className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
                  About You
                </label>
                <div className="relative group">
                  <textarea
                    name="bio"
                    value={formState.bio}
                    onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                    className="w-full px-3 py-3 lg:px-4 lg:py-3 text-sm lg:text-base text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 group-hover:bg-white/15 h-24 lg:h-28 resize-none"
                    placeholder="Tell others about yourself and your language learning goals..."
                  />
                  <div className="absolute inset-0 rounded-lg lg:rounded-xl border border-green-400/0 group-focus-within:border-green-400/50 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* LANGUAGES */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* NATIVE LANGUAGE */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base">
                    <GlobeIcon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                    Native Language
                  </label>
                  <div className="relative group">
                    <select
                      name="nativeLanguage"
                      value={formState.nativeLanguage}
                      onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                      className="w-full px-3 py-3 lg:px-4 lg:py-3 text-sm lg:text-base text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 group-hover:bg-white/15 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-gray-800 text-white">Select your native language</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`native-${lang}`} value={lang.toLowerCase()} className="bg-gray-800 text-white">
                          {lang}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-0 rounded-lg lg:rounded-xl border border-blue-400/0 group-focus-within:border-blue-400/50 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* LEARNING LANGUAGE */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base">
                    <BookOpenIcon className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                    Learning Language
                  </label>
                  <div className="relative group">
                    <select
                      name="learningLanguage"
                      value={formState.learningLanguage}
                      onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                      className="w-full px-3 py-3 lg:px-4 lg:py-3 text-sm lg:text-base text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 group-hover:bg-white/15 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-gray-800 text-white">Select language you're learning</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`learning-${lang}`} value={lang.toLowerCase()} className="bg-gray-800 text-white">
                          {lang}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-0 rounded-lg lg:rounded-xl border border-purple-400/0 group-focus-within:border-purple-400/50 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base">
                  <MapPinIcon className="w-4 h-4 lg:w-5 lg:h-5 text-pink-400" />
                  Location
                </label>
                <div className="relative group">
                  <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 lg:left-4 w-4 h-4 lg:w-5 lg:h-5 text-pink-400/70" />
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="w-full pl-10 lg:pl-12 pr-3 py-3 lg:pr-4 lg:py-3 text-sm lg:text-base text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg lg:rounded-xl placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 group-hover:bg-white/15"
                    placeholder="City, Country"
                  />
                  <div className="absolute inset-0 rounded-lg lg:rounded-xl border border-pink-400/0 group-focus-within:border-pink-400/50 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                className="w-full py-4 px-4 lg:py-4 lg:px-6 text-base lg:text-lg font-bold text-white bg-gradient-to-r from-orange-500 via-purple-600 to-blue-500 hover:from-orange-600 hover:via-purple-700 hover:to-blue-600 rounded-lg lg:rounded-xl shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 lg:gap-3 group relative overflow-hidden" 
                disabled={isPending} 
                type="submit"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                {isPending ? (
                  <>
                    <LoaderIcon className="animate-spin w-5 h-5 lg:w-6 lg:h-6" />
                    <span>Completing Setup...</span>
                  </>
                ) : (
                  <>
                    <ShipWheelIcon className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Complete Onboarding</span>
                    <SparklesIcon className="w-4 h-4 lg:w-5 lg:h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
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

export default OnboardingPage;