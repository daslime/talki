import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon, MenuIcon, XIcon, UserIcon, SettingsIcon, ChevronRightIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useState } from "react";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50 sticky top-0 z-50 h-16 flex items-center shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            {/* LOGO - ONLY IN THE CHAT PAGE */}
            {isChatPage && (
              <div className="flex items-center">
  <Link to="/" className="flex items-center gap-2.5 group">
    <div className="relative flex-shrink-0">
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
      <img
        src="/talki.png"
        alt="Talki Logo"
        className="relative w-10 h-10 drop-shadow-xl"
      />
    </div>
    <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-400 transition-all duration-300">
      Talk
      <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
        i
      </span>
    </span>
  </Link>
</div>

            )}

            {/* Desktop Navigation - Moved to the right */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
              <Link to="/notifications" className="group">
                <button className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200 group-hover:scale-105">
                  <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  {/* Optional notification badge */}
                  {/* <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span> */}
                </button>
              </Link>

              <div className="relative z-[60]">
                <ThemeSelector />
              </div>

              <div className="flex items-center gap-3 ml-2">
                <div className="avatar">
                  <div className="w-9 rounded-full ring-2 ring-gray-200 dark:ring-slate-700 hover:ring-orange-500 dark:hover:ring-orange-400 transition-all duration-200">
                    <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
                  </div>
                </div>

                <button 
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-105 group" 
                  onClick={logoutMutation}
                >
                  <LogOutIcon className="h-5 w-5 text-gray-600 group-hover:text-red-500 dark:text-gray-300 dark:group-hover:text-red-400" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button - Moved to the right */}
            <div className="md:hidden flex items-center gap-3 ml-auto">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-slate-700 overflow-hidden">
                  <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <button
                onClick={toggleMobileMenu}
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200 border border-gray-200 dark:border-slate-600"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <MenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] md:hidden"
            onClick={toggleMobileMenu}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-16 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-[60] md:hidden transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-slate-600 overflow-hidden">
                    <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {authUser?.fullName || "User"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {authUser?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4 space-y-1">
                  {/* Notifications */}
                  <Link 
                    to="/notifications" 
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-200">
                      <BellIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Notifications</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">View your alerts</p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </Link>

                  {/* Profile */}
                  <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200 group">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors duration-200">
                      <UserIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-medium">Profile</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Manage account</p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </button>

                  {/* Settings */}
                  <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200 group">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-slate-600 transition-colors duration-200">
                      <SettingsIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-medium">Settings</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">App preferences</p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </button>

                  {/* Theme Selector */}
                  <div className="flex items-center gap-3 px-3 py-3 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Theme</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Appearance</p>
                    </div>
                    <div className="relative z-[70]">
                      <ThemeSelector />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 dark:border-slate-700">
                <button 
                  onClick={() => {
                    logoutMutation();
                    toggleMobileMenu();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors duration-200">
                    <LogOutIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium">Sign Out</span>
                    <p className="text-sm text-red-500 dark:text-red-400/80">End your session</p>
                  </div>
                </button>

                {/* App Version */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    TALKI by Surge1024.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;