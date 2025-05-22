import React, { useEffect, useState } from 'react';
import {
  Menu,
  Heart,
  MessageCircle,
  Bell,
  UserCircle
} from 'lucide-react';
import { Container, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import appwriteService from '../../appwrite/config';
import Swal from 'sweetalert2';

function Header() {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState(false);
  const [userName, setUserName] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    // { name: 'Admin', slug: '/', active: !authStatus },
    { name: 'Sell now', slug: '/add-post', active: authStatus },

  ];

  useEffect(() => {
    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        setAuthStatus(true);
        setUserName(user.name?.split(' ')[0] || null);

        // Offer message count
        const offers = await appwriteService.getOffers();
        const sellerOffers = offers.documents.filter(o => o.sellerId === user.$id);
        const totalMessages = sellerOffers.reduce((acc, offer) => acc + offer.buyerId.length, 0);
        setMessageCount(totalMessages);

        // Notification count
        const notifs = await appwriteService.getNotificationsByBuyerId(user.$id);
        const totalNotifs = notifs.documents.reduce((acc, doc) => acc + (doc.messages?.length || 0), 0);
        setNotificationCount(totalNotifs);
      }

      // Favorites from localStorage
      const favData = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavoriteCount(favData.length);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const success = await authService.logout();
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'See you again!',
        text: 'You have been logged out successfully.',
        timer: 2000,
        showConfirmButton: false,
        willClose: () => {
          window.location.reload();
        }
      });
    } else {
      Swal.fire('Error', 'Logout failed. Try again.', 'error');
    }
  };

  return (
    <header className="fixed top-0 left-0 py-3 px-4 sm:px-6 md:px-8 bg-white dark:bg-slate-900 dark:text-white border-b shadow-sm w-full z-50">
      <Container>
        <nav className="flex flex-wrap items-center justify-between gap-y-2 w-full">
          <Link to="/" className="flex items-center gap-2">
            <Logo width="36px" />
            <span className="font-bold text-lg hidden sm:inline">Ebiblos</span>
          </Link>

          <div className="flex items-center gap-2">
            <ul className="hidden md:flex items-center gap-3">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="px-3 py-1.5 rounded-lg text-sm hover:bg-blue-100 cursor-pointer dark:hover:bg-slate-700 transition"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <>
                  <li className="relative">
                    <button
                      onClick={() => navigate('/favorites')}
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
                      title="Favorites"
                    >
                      <Heart size={18} />
                      {favoriteCount > 0 && (
                        <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full px-1.5">
                          {favoriteCount}
                        </span>
                      )}
                    </button>
                  </li>
                  <li className="relative">
                    <button
                      onClick={() => navigate('/messages')}
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
                      title="Messages"
                    >
                      <MessageCircle size={18} />
                      {messageCount > 0 && (
                        <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full px-1.5">
                          {messageCount}
                        </span>
                      )}
                    </button>
                  </li>
                  <li className="relative">
                    <button
                      onClick={() => navigate('/notifications')}
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
                      title="Notifications"
                    >
                      <Bell size={18} />
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full px-1.5">
                          {notificationCount}
                        </span>
                      )}
                    </button>
                  </li>
                  <li className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm hover:bg-blue-100 dark:hover:bg-slate-700 transition"
                      title="Profile Menu"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white">
                        <UserCircle size={20} />
                      </div>
                      <span className="hidden sm:inline">{userName || 'Account'}</span>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 bg-white dark:bg-slate-800 shadow-lg rounded-md overflow-hidden z-50 w-40">
                        <button
                          onClick={() => {
                            navigate('/dashboardPage');
                            setDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                          Profile
                        </button>
                        <div className="border-t dark:border-slate-700" />
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </li>
                </>
              )}
            </ul>

            <button
              className="md:hidden p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
