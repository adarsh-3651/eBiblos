// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/store/themeSlice';
import {
  Moon,
  Sun,
  Globe2,
  UserCircle,
  Menu,
  ShoppingCart,
  Heart,
  Search
} from 'lucide-react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';

function Header({ onSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.mode === 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Products', slug: '/all-posts', active: authStatus },
    { name: 'Sell now', slug: '/add-post', active: authStatus },
  ];

  const handleSearch = () => {
    onSearch && onSearch(query.trim());
  };

  return (
    <header className="py-2 px-4 sm:px-6 md:px-8 bg-white dark:bg-slate-900 dark:text-white border-b w-full z-50">
      <Container>
        <nav className="flex flex-wrap items-center justify-between w-full gap-y-2">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo width="40px" />
            <span className="font-bold text-lg hidden sm:inline tracking-wide">
              Ebiblos
            </span>
          </Link>

          {/* Center: Search Bar */}
          <div className="flex-1 mx-4 hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full px-4 py-2 rounded-full border dark:border-slate-700 focus:outline-none focus:ring"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 text-gray-600 dark:text-gray-300"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2">
            <ul className="hidden md:flex items-center gap-2 sm:gap-3">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="px-3 py-1.5 rounded-xl text-sm hover:bg-blue-100 dark:hover:bg-slate-700 transition"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <>
                  <li>
                    <button
                      onClick={() => navigate('/favorites')}
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition"
                      title="Favorites"
                    >
                      <Heart size={18} />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/cart')}
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition"
                      title="Cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/dashboardPage')}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm hover:bg-blue-100 dark:hover:bg-slate-700 transition"
                      title="Profile Dashboard"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-bold">
                        <UserCircle size={20} />
                      </div>
                      <span className="hidden sm:inline">Profile</span>
                    </button>
                  </li>
                  <LogoutBtn />
                </>
              )}
            </ul>

            {/* Theme & Language Toggles */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition"
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition"
              title="Language"
            >
              <Globe2 size={18} />
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <ul className="absolute top-14 right-4 bg-white dark:bg-slate-800 shadow-md rounded-xl p-4 space-y-2 md:hidden z-50 w-48">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/favorites');
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700"
                    >
                      <Heart size={18} /> Favorites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/cart');
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700"
                    >
                      <ShoppingCart size={18} /> Cart
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/dashboardPage');
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700"
                    >
                      <UserCircle size={18} /> Profile
                    </button>
                  </li>
                  <li>
                    <LogoutBtn />
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
