import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { 
  BellIcon, 
  ClockIcon, 
  MessageSquareIcon, 
  UserCheckIcon,
  CheckCircleIcon,
  UserPlusIcon,
  SettingsIcon,
  FilterIcon,
  MoreVerticalIcon,
  CheckIcon,
  XIcon
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const weeksAgo = Math.floor(daysAgo / 7);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (secondsAgo < 60) {
      return "just now";
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
    } else if (daysAgo < 7) {
      return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
    } else if (weeksAgo < 4) {
      return `${weeksAgo} week${weeksAgo !== 1 ? 's' : ''} ago`;
    } else if (monthsAgo < 12) {
      return `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
    } else {
      return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BellIcon className="h-7 w-7 sm:h-8 sm:w-8 text-gray-900 dark:text-white" />
                {(incomingRequests.length > 0) && (
                  <div className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">
                      {incomingRequests.length > 9 ? '9+' : incomingRequests.length}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Notifications
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                  Stay updated with your connections
                </p>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <FilterIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <SettingsIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
              <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Friend Requests Section */}
            {incomingRequests.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <UserCheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                        Friend Requests
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {incomingRequests.length} pending request{incomingRequests.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Mark all as read
                  </button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {/* Mobile Layout */}
                      <div className="block sm:hidden">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={request.sender.profilePic}
                              alt={request.sender.fullName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                              <UserPlusIcon className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                              {request.sender.fullName}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Wants to connect with you
                            </p>
                          </div>
                          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreVerticalIcon className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            Native: {request.sender.nativeLanguage}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            Learning: {request.sender.learningLanguage}
                          </span>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                            className="flex-1 flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                          >
                            {isPending ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <CheckIcon className="h-4 w-4 mr-2" />
                                Accept
                              </>
                            )}
                          </button>
                          <button className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors duration-200">
                            <XIcon className="h-4 w-4 mr-2" />
                            Decline
                          </button>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={request.sender.profilePic}
                                alt={request.sender.fullName}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                                <UserPlusIcon className="h-3 w-3 text-white" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {request.sender.fullName}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                Wants to connect with you
                              </p>
                              <div className="flex space-x-2">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                  Native: {request.sender.nativeLanguage}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                  Learning: {request.sender.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              <MoreVerticalIcon className="h-5 w-5" />
                            </button>
                            <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium">
                              Decline
                            </button>
                            <button
                              onClick={() => acceptRequestMutation(request._id)}
                              disabled={isPending}
                              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium flex items-center"
                            >
                              {isPending ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                              ) : (
                                <CheckIcon className="h-4 w-4 mr-2" />
                              )}
                              Accept
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Recent Activity Section */}
            {acceptedRequests.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                        Recent Activity
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        New connections and updates
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={notification.recipient.profilePic}
                            alt={notification.recipient.fullName}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                            <CheckCircleIcon className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm sm:text-base text-gray-900 dark:text-white">
                                <span className="font-semibold">{notification.recipient.fullName}</span>{' '}
                                accepted your friend request
                              </p>
                              <div className="flex items-center mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                {formatTimeAgo(notification.createdAt)}
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                <MessageSquareIcon className="h-3 w-3 mr-1" />
                                Connected
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empty State */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center">
                <NoNotificationsFound />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;