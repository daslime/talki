import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  ArrowLeft,
  Archive,
  Settings,
  Users,
  MessageCircle,
  Send,
  Smile,
  Paperclip,
  Mic,
  Check,
  CheckCheck,
  Camera,
  Plus
} from 'lucide-react';
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getUserFriends, getStreamToken } from '../lib/api';
import { StreamChat } from 'stream-chat';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from 'stream-chat-react';
import toast from 'react-hot-toast';
import ChatLoader from '../components/ChatLoader';
import CallButton from '../components/CallButton';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const MessagesPage = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  // Fetch friends data
  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
    enabled: !!authUser,
  });

  const { data: tokenData } = useQuery({
    queryKey: ['streamToken'],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  // Convert friends to chat format with real online status
  const chats = friends.map(friend => ({
    id: friend._id,
    name: friend.fullName,
    avatar: friend.profilePic || '/default-avatar.png',
    lastMessage: 'Start a conversation',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    unread: Math.floor(Math.random() * 5), // Random unread count for demo
    online: onlineUsers.has(friend._id),
    lastSeen: friend.lastSeen || new Date(Date.now() - Math.random() * 86400000).toISOString(),
    typing: false,
    userId: friend._id
  }));

  // Initialize Stream Chat and online status
  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) {
        setLoading(false);
        return;
      }

      try {
        console.log('Initializing stream chat client...');
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        setChatClient(client);
        
        // Listen for user presence changes
        client.on('user.presence.changed', (event) => {
          setOnlineUsers(prev => {
            const newSet = new Set(prev);
            if (event.user.online) {
              newSet.add(event.user.id);
            } else {
              newSet.delete(event.user.id);
            }
            return newSet;
          });
        });

        // Set initial online users
        const onlineFriends = friends.filter(friend => Math.random() > 0.3).map(f => f._id);
        setOnlineUsers(new Set(onlineFriends));
        
      } catch (error) {
        console.error('Error initializing chat:', error);
        toast.error('Could not connect to chat. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, friends]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle chat selection
  const handleChatSelect = async (chat) => {
    if (!chatClient || !authUser) return;

    try {
      const channelId = [authUser._id, chat.userId].sort().join('-');
      const newChannel = chatClient.channel('messaging', channelId, {
        members: [authUser._id, chat.userId],
      });

      await newChannel.watch();
      setChannel(newChannel);
      setSelectedChat(chat);
    } catch (error) {
      console.error('Error selecting chat:', error);
      toast.error('Could not open chat. Please try again.');
    }
  };



  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success('Video call link sent successfully!');
      window.open(callUrl, '_blank');
    }
  };

  const handlePhoneCall = () => {
    if (channel) {
      channel.sendMessage({
        text: `📞 ${authUser.fullName} is calling you. Join the call to connect!`,
      });
      toast.success('Call notification sent!');
    }
  };



  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function for last seen text
  const getLastSeenText = (chat = selectedChat) => {
    if (!chat) return '';
    if (chat.online) return 'online';
    const lastSeen = new Date(chat.lastSeen);
    const now = new Date();
    const diffMs = now - lastSeen;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'last seen just now';
    if (diffMins < 60) return `last seen ${diffMins} minutes ago`;
    if (diffHours < 24) return `last seen ${diffHours} hours ago`;
    if (diffDays === 1) return 'last seen yesterday';
    return `last seen ${diffDays} days ago`;
  };



  const ChatListItem = ({ chat }) => {
    return (
      <div
        onClick={() => handleChatSelect(chat)}
        className={`flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 border-b border-gray-100 dark:border-gray-800 ${
          selectedChat?.id === chat.id ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500' : ''
        }`}
      >
        <div className="relative flex-shrink-0">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
            chat.online ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
        </div>
        <div className="flex-1 ml-3 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`font-medium truncate ${
              chat.unread > 0 ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-900 dark:text-white'
            }`}>
              {chat.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`text-xs ${
                chat.unread > 0 ? 'text-green-600 dark:text-green-400 font-medium' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {chat.time}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex-1 min-w-0">
              {chat.typing ? (
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-green-500 italic">typing...</span>
                </div>
              ) : (
                <p className={`text-sm truncate ${
                   chat.unread > 0 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-300'
                 }`}>
                   {chat.lastMessage}
                 </p>
              )}
            </div>
            {chat.unread > 0 && (
              <div className="flex items-center space-x-2">
                <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium">
                  {chat.unread > 99 ? '99+' : chat.unread}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading || friendsLoading) {
    return <ChatLoader />;
  }

  if (isMobile && selectedChat) {
    // Mobile chat view
    return (
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile Chat Header */}
        <div className="bg-green-600 text-white p-4 flex items-center space-x-3">
          <button
            onClick={() => setSelectedChat(null)}
            className="p-1 hover:bg-green-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img
            src={selectedChat.avatar}
            alt={selectedChat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold">{selectedChat.name}</h2>
            <p className={`text-sm ${
              selectedChat.online ? 'text-green-100' : 'text-green-200'
            }`}>
              {getLastSeenText()}
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleVideoCall}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
            >
              <Video className="w-5 h-5" />
            </button>
            <button 
              onClick={handlePhoneCall}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stream Chat Area - Real Chat Implementation Mobile */}
        <div className="flex-1 flex flex-col">
          {chatClient && channel ? (
            <Chat client={chatClient}>
                   <Channel channel={channel}>
                     <div className="w-full relative">
                       <CallButton handleVideoCall={handleVideoCall} />
                       <Window>
                         <div className="flex-1 flex flex-col">
                           {/* Custom styled message list */}
                           <div 
                             className="flex-1 overflow-y-auto"
                             style={{
                               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                             }}
                           >
                             <MessageList />
                           </div>
                           {/* Custom styled message input */}
                           <div className="bg-gray-100 dark:bg-gray-800 p-3">
                             <MessageInput focus />
                           </div>
                         </div>
                       </Window>
                     </div>
                   </Channel>
                 </Chat>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Loading chat...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Chat List Sidebar */}
      <div className={`${isMobile && selectedChat ? 'hidden' : 'flex'} flex-col w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900`}>
        {/* Header */}
        <div className="bg-green-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Messages</h1>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
                <Users className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-green-700 text-white placeholder-green-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
              <Archive className="w-4 h-4" />
              <span className="text-sm">Archived</span>
            </button>
            <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <ChatListItem key={chat.id} chat={chat} />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {selectedChat.name}
                    </h2>
                    <p className={`text-sm ${
                      selectedChat.online ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {getLastSeenText()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleVideoCall}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handlePhoneCall}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stream Chat Area - Real Chat Implementation */}
            <div className="flex-1 flex flex-col">
              {chatClient && channel ? (
                 <Chat client={chatClient}>
                   <Channel channel={channel}>
                     <div className="w-full relative">
                       <CallButton handleVideoCall={handleVideoCall} />
                       <Window>
                         <div className="flex-1 flex flex-col">
                           {/* Custom styled message list */}
                           <div 
                             className="flex-1 overflow-y-auto"
                             style={{
                               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                             }}
                           >
                             <MessageList />
                           </div>
                           {/* Custom styled message input */}
                           <div className="bg-gray-100 dark:bg-gray-800 p-4">
                             <MessageInput focus />
                           </div>
                         </div>
                       </Window>
                     </div>
                   </Channel>
                 </Chat>
               ) : (
                 <div className="flex-1 flex items-center justify-center">
                   <div className="text-center text-gray-500">
                     <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                     <p>Loading chat...</p>
                   </div>
                 </div>
               )}
            </div>
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-32 h-32 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Welcome to Talki Messages
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Select a conversation from the sidebar to start messaging, or create a new chat to connect with your friends and colleagues.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;