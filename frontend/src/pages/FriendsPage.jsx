import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getUserFriends,
  getRecommendedUsers,
  sendFriendRequest,
  getOutgoingFriendReqs,
} from "../lib/api";
import { 
  UsersIcon, 
  UserPlusIcon, 
  MessageCircleIcon, 
  VideoIcon, 
  SearchIcon,
  FilterIcon,
  MapPinIcon,
  GlobeIcon,
  CheckCircleIcon,
  ClockIcon,
  UserCheckIcon,
  SparklesIcon
} from "lucide-react";
import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { capitialize } from "../lib/utils";
import toast from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const queryClient = useQueryClient();
  useAuthUser(); // Only initialize auth hook without destructuring unused value

  // Fetch user's friends
  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Fetch recommended users
  const { data: recommendedUsers = [], isLoading: recommendedLoading } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  // Fetch outgoing friend requests
  const { data: outgoingRequests = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  // Send friend request mutation
  const { mutate: sendRequest, isPending: isSending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      toast.success("Friend request sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to send friend request");
    },
  });

  const handleSendRequest = (userId) => {
    sendRequest(userId);
  };

  // Filter functions
  const filterUsers = (users) => {
    return users.filter(user => {
      const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = !filterLanguage || 
                             user.nativeLanguage === filterLanguage ||
                             user.learningLanguage === filterLanguage;
      return matchesSearch && matchesLanguage;
    });
  };

  const filteredFriends = filterUsers(friends);
  const filteredRecommended = filterUsers(recommendedUsers);

  // Get unique languages for filter
 // Get unique languages for filter
const allLanguages = [...new Set([
  ...friends.flatMap(f => [f.nativeLanguage, f.learningLanguage]),
  ...recommendedUsers.flatMap(u => [u.nativeLanguage, u.learningLanguage])
])].filter(Boolean);


  const FriendCard = ({ user, showActions = false }) => (
    <div className="bg-base-100 dark:bg-slate-800/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 dark:border-slate-700/50 group hover:scale-[1.02]">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-base-300 dark:border-slate-600">
            <img 
              src={user.profilePic || "/default-avatar.png"} 
              alt={user.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-base-100 dark:border-slate-800"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg text-base-content dark:text-white truncate">
                {user.fullName}
              </h3>
              <p className="text-sm text-base-content/70 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>
            {showActions && (
              <button
                onClick={() => handleSendRequest(user._id)}
                disabled={isSending || outgoingRequests.some(req => req.to._id === user._id)}
                className="btn btn-primary btn-sm gap-2 disabled:opacity-50"
              >
                {outgoingRequests.some(req => req.to._id === user._id) ? (
                  <>
                    <ClockIcon className="w-4 h-4" />
                    Pending
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="w-4 h-4" />
                    Add Friend
                  </>
                )}
              </button>
            )}
          </div>

          {/* Languages */}
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              <span className="text-lg">{LANGUAGE_TO_FLAG[user.nativeLanguage]}</span>
              <span>Native: {capitialize(user.nativeLanguage)}</span>
            </div>
            <div className="flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
              <span className="text-lg">{LANGUAGE_TO_FLAG[user.learningLanguage]}</span>
              <span>Learning: {capitialize(user.learningLanguage)}</span>
            </div>
          </div>

          {/* Location & Bio */}
          {user.location && (
            <div className="flex items-center gap-1 text-sm text-base-content/60 dark:text-gray-500 mb-2">
              <MapPinIcon className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
          
          {user.bio && (
            <p className="text-sm text-base-content/70 dark:text-gray-400 line-clamp-2 mb-3">
              {user.bio}
            </p>
          )}

          {/* Action Buttons for Friends */}
          {!showActions && (
            <div className="flex gap-2">
              <Link
                to={`/chat/${user._id}`}
                className="btn btn-primary btn-sm gap-2 flex-1"
              >
                <MessageCircleIcon className="w-4 h-4" />
                Chat
              </Link>
              <Link
                to={`/call/${user._id}`}
                className="btn btn-success btn-sm gap-2 flex-1"
              >
                <VideoIcon className="w-4 h-4" />
                Call
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const EmptyState = ({  title, description }) => (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-base-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
        <Icon className="w-12 h-12 text-base-content/40 dark:text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-base-content dark:text-white mb-2">{title}</h3>
      <p className="text-base-content/70 dark:text-gray-400 max-w-md mx-auto">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
              <UsersIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content dark:text-white">
                Friends & Connections
              </h1>
              <p className="text-base-content/70 dark:text-gray-400">
                Connect with language partners around the world
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
              <input
                type="text"
                placeholder="Search friends by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 bg-base-100 dark:bg-slate-800 border-base-300 dark:border-slate-600"
              />
            </div>
            <div className="relative">
              <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="select select-bordered pl-10 bg-base-100 dark:bg-slate-800 border-base-300 dark:border-slate-600 min-w-[200px]"
              >
                <option value="">All Languages</option>
                {allLanguages.map(lang => (
                  <option key={lang} value={lang}>
                    {LANGUAGE_TO_FLAG[lang]} {capitialize(lang)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs tabs-boxed bg-base-200 dark:bg-slate-800 p-1">
            <button
              className={`tab tab-lg flex-1 gap-2 ${activeTab === 'friends' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('friends')}
            >
              <UserCheckIcon className="w-5 h-5" />
              My Friends ({filteredFriends.length})
            </button>
            <button
              className={`tab tab-lg flex-1 gap-2 ${activeTab === 'discover' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('discover')}
            >
              <SparklesIcon className="w-5 h-5" />
              Discover ({filteredRecommended.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'friends' && (
            <div>
              {friendsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-base-100 dark:bg-slate-800 rounded-xl p-6 animate-pulse">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-base-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-base-300 dark:bg-slate-600 rounded w-3/4"></div>
                          <div className="h-3 bg-base-300 dark:bg-slate-600 rounded w-1/2"></div>
                          <div className="h-3 bg-base-300 dark:bg-slate-600 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredFriends.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFriends.map((friend) => (
                    <FriendCard key={friend._id} user={friend} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={UsersIcon}
                  title="No friends found"
                  description={searchTerm || filterLanguage ? 
                    "Try adjusting your search or filter criteria." :
                    "Start connecting with language partners to build your network!"
                  }
                />
              )}
            </div>
          )}

          {activeTab === 'discover' && (
            <div>
              {recommendedLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-base-100 dark:bg-slate-800 rounded-xl p-6 animate-pulse">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-base-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-base-300 dark:bg-slate-600 rounded w-3/4"></div>
                          <div className="h-3 bg-base-300 dark:bg-slate-600 rounded w-1/2"></div>
                          <div className="h-3 bg-base-300 dark:bg-slate-600 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredRecommended.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecommended.map((user) => (
                    <FriendCard key={user._id} user={user} showActions={true} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={SparklesIcon}
                  title="No recommendations found"
                  description={searchTerm || filterLanguage ? 
                    "Try adjusting your search or filter criteria." :
                    "We're working on finding the perfect language partners for you!"
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;