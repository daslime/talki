import { Link, useLocation } from "react-router";
import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon, MessageCircleIcon, LogOutIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-base-300 via-base-200/50 to-base-300 dark:from-slate-950 dark:via-blue-950/50 dark:to-slate-950 border-r border-base-300 dark:border-white/10 hidden lg:flex flex-col h-screen sticky top-0 backdrop-blur-xl  overflow-hidden transition-all duration-300 ease-in-out`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-4 w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl animate-pulse transition-all duration-300 ${isCollapsed ? 'w-8 h-8' : 'w-32 h-32'}`}></div>
        <div className={`absolute bottom-20 right-4 w-40 h-40 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-2xl animate-pulse transition-all duration-300 ${isCollapsed ? 'w-8 h-8 bottom-32' : 'w-40 h-40'}`} style={{animationDelay: '2s'}}></div>
      </div>

      {/* Logo Section */}
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-b border-base-300 dark:border-white/10 relative z-10 transition-all duration-300`}>
        <Link to="/" className="flex items-center gap-3 group justify-center lg:justify-start">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#F97316] to-[#3B82F6] rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <img
              src="/talki.png"
              alt="Talki Logo"
              className="relative h-10 w-10 drop-shadow-xl"
            />
          </div>
          <span className={`text-2xl font-black bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent tracking-tight transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'
          }`}>
            Talk<span className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">i</span>
          </span>
        </Link>
      </div>

      {/* Toggle Button */}
      <div className={`${isCollapsed ? 'px-2 py-2' : 'px-4 py-2'} relative z-10 transition-all duration-300`}>
        <button
          onClick={toggleSidebar}
          className={`w-full flex items-center p-2 rounded-lg bg-base-content/5 dark:bg-white/5 hover:bg-base-content/10 dark:hover:bg-white/10 transition-all duration-300 group border border-base-300 dark:border-white/10 ${
            isCollapsed ? 'justify-center' : 'justify-center'
          }`}
        >
          <div className="relative">
            {isCollapsed ? (
              <ChevronRightIcon className="size-4 text-base-content/70 dark:text-gray-400 group-hover:text-primary transition-colors duration-300" />
            ) : (
              <ChevronLeftIcon className="size-4 text-base-content/70 dark:text-gray-400 group-hover:text-primary transition-colors duration-300" />
            )}
          </div>
          <span className={`ml-2 text-sm font-medium text-base-content/70 dark:text-gray-400 group-hover:text-primary transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'
          }`}>
            Collapse
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} py-4 space-y-2 relative z-10 transition-all duration-300`}>
        {/* Home */}
        <div className="relative group">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-base-content/10 dark:hover:bg-white/10 backdrop-blur-sm relative overflow-hidden ${
              isCollapsed ? 'justify-center px-2' : 'justify-start px-4'
            } ${
              currentPath === "/" 
                ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-base-content dark:text-white shadow-lg shadow-primary/10" 
                : "text-base-content/70 dark:text-gray-300 hover:text-base-content dark:hover:text-white"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-base-content/0 via-base-content/5 dark:from-white/0 dark:via-white/5 to-base-content/0 dark:to-white/0 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <HomeIcon className={`size-5 relative z-10 transition-colors duration-300 flex-shrink-0 ${
              currentPath === "/" ? "text-primary" : "text-base-content/50 dark:text-gray-400 group-hover:text-primary"
            }`} />
            <span className={`font-medium relative z-10 transition-all duration-300 whitespace-nowrap ${
              isCollapsed ? 'w-0 opacity-0 overflow-hidden ml-0' : 'w-auto opacity-100 ml-0'
            }`}>
              Home
            </span>
            {currentPath === "/" && !isCollapsed && (
              <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
            )}
          </Link>
          
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 dark:bg-slate-800 text-base-content dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 border border-base-300 dark:border-white/10">
              Home
            </div>
          )}
        </div>

        {/* Friends */}
        <div className="relative group">
          <Link
            to="/friends"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-base-content/10 dark:hover:bg-white/10 backdrop-blur-sm relative overflow-hidden ${
              isCollapsed ? 'justify-center px-2' : 'justify-start px-4'
            } ${
              currentPath === "/friends" 
                ? "bg-gradient-to-r from-accent/20 to-success/20 border border-accent/30 text-base-content dark:text-white shadow-lg shadow-accent/10" 
                : "text-base-content/70 dark:text-gray-300 hover:text-base-content dark:hover:text-white"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-base-content/0 via-base-content/5 dark:from-white/0 dark:via-white/5 to-base-content/0 dark:to-white/0 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <UsersIcon className={`size-5 relative z-10 transition-colors duration-300 flex-shrink-0 ${
              currentPath === "/friends" ? "text-accent" : "text-base-content/50 dark:text-gray-400 group-hover:text-accent"
            }`} />
            <span className={`font-medium relative z-10 transition-all duration-300 whitespace-nowrap ${
              isCollapsed ? 'w-0 opacity-0 overflow-hidden ml-0' : 'w-auto opacity-100 ml-0'
            }`}>
              Friends
            </span>
            {currentPath === "/friends" && !isCollapsed && (
              <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-accent to-success rounded-full animate-pulse"></div>
            )}
          </Link>

          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 dark:bg-slate-800 text-base-content dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 border border-base-300 dark:border-white/10">
              Friends
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative group">
          <Link
            to="/messages"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-base-content/10 dark:hover:bg-white/10 backdrop-blur-sm relative overflow-hidden ${
              isCollapsed ? 'justify-center px-2' : 'justify-start px-4'
            } ${
              currentPath === "/messages" 
                ? "bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30 text-base-content dark:text-white shadow-lg shadow-green-500/10" 
                : "text-base-content/70 dark:text-gray-300 hover:text-base-content dark:hover:text-white"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-base-content/0 via-base-content/5 dark:from-white/0 dark:via-white/5 to-base-content/0 dark:to-white/0 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <MessageCircleIcon className={`size-5 relative z-10 transition-colors duration-300 flex-shrink-0 ${
              currentPath === "/messages" ? "text-green-500" : "text-base-content/50 dark:text-gray-400 group-hover:text-green-500"
            }`} />
            <span className={`font-medium relative z-10 transition-all duration-300 whitespace-nowrap ${
              isCollapsed ? 'w-0 opacity-0 overflow-hidden ml-0' : 'w-auto opacity-100 ml-0'
            }`}>
              Messages
            </span>
            {currentPath === "/messages" && !isCollapsed && (
              <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-pulse"></div>
            )}
          </Link>

          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 dark:bg-slate-800 text-base-content dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 border border-base-300 dark:border-white/10">
              Messages
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative group">
          <Link
            to="/notifications"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-base-content/10 dark:hover:bg-white/10 backdrop-blur-sm relative overflow-hidden ${
              isCollapsed ? 'justify-center px-2' : 'justify-start px-4'
            } ${
              currentPath === "/notifications" 
                ? "bg-gradient-to-r from-secondary/20 to-accent/20 border border-secondary/30 text-base-content dark:text-white shadow-lg shadow-secondary/10" 
                : "text-base-content/70 dark:text-gray-300 hover:text-base-content dark:hover:text-white"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-base-content/0 via-base-content/5 dark:from-white/0 dark:via-white/5 to-base-content/0 dark:to-white/0 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <BellIcon className={`size-5 relative z-10 transition-colors duration-300 flex-shrink-0 ${
              currentPath === "/notifications" ? "text-secondary" : "text-base-content/50 dark:text-gray-400 group-hover:text-secondary"
            }`} />
            <span className={`font-medium relative z-10 transition-all duration-300 whitespace-nowrap ${
              isCollapsed ? 'w-0 opacity-0 overflow-hidden ml-0' : 'w-auto opacity-100 ml-0'
            }`}>
              Notifications
            </span>
            {currentPath === "/notifications" && !isCollapsed && (
              <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-secondary to-accent rounded-full animate-pulse"></div>
            )}
          </Link>

          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 dark:bg-slate-800 text-base-content dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 border border-base-300 dark:border-white/10">
              Notifications
            </div>
          )}
        </div>
      </nav>

      {/* User Profile Section - Optimized for Collapse */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-base-300 dark:border-white/10 mt-auto relative z-10 transition-all duration-300`}>
        <div className="relative group">
          <div className={`bg-base-content/5 dark:bg-white/5 backdrop-blur-sm border border-base-300 dark:border-white/10 rounded-xl hover:bg-base-content/10 dark:hover:bg-white/10 transition-all duration-300 relative overflow-hidden ${
            isCollapsed ? 'p-2' : 'p-4'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-base-content/0 via-base-content/5 dark:from-white/0 dark:via-white/5 to-base-content/0 dark:to-white/0 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            
            <div className={`flex items-center relative z-10 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F97316] to-[#3B82F6] rounded-full blur opacity-50"></div>
                <div className={`relative rounded-full overflow-hidden border-2 border-base-300 dark:border-white/20 ${
                  isCollapsed ? 'w-8 h-8' : 'w-10 h-10'
                } transition-all duration-300`}>
                  <img 
                    src={authUser?.profilePic || "/default-avatar.png"} 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online indicator - adjusted for collapse */}
                <div className={`absolute bg-gradient-to-r from-success to-accent rounded-full border-2 border-base-100 dark:border-slate-950 animate-pulse transition-all duration-300 ${
                  isCollapsed ? '-bottom-0.5 -right-0.5 w-2 h-2' : '-bottom-0.5 -right-0.5 w-3 h-3'
                }`}></div>
              </div>
              
              {/* User info - completely hidden when collapsed */}
              <div className={`flex-1 min-w-0 transition-all duration-300 ${
                isCollapsed ? 'w-0 opacity-0 overflow-hidden ml-0' : 'w-auto opacity-100 ml-3'
              }`}>
                <p className="font-semibold text-base-content dark:text-white text-sm truncate">
                  {authUser?.fullName || "Explorer"}
                </p>
                <p className="text-xs text-success flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                  Online
                </p>
              </div>
              
              {/* Logout button - hidden when collapsed, shown on hover */}
              <button className={`transition-all duration-300 p-1.5 hover:bg-error/20 rounded-lg ${
                isCollapsed ? 'absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-base-100 dark:bg-slate-800 shadow-lg' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <LogOutIcon className="size-4 text-error" />
              </button>
            </div>
          </div>

          {/* Tooltip for collapsed user profile */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 bottom-0 px-2 py-1 bg-base-100 dark:bg-slate-800 text-base-content dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 border border-base-300 dark:border-white/10">
              {authUser?.fullName || "Explorer"} • Online
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;