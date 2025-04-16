import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/store/themeSlice';
import { Moon, Sun, Globe2 } from 'lucide-react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  // Ensure darkMode is properly derived from Redux state
  const darkMode = useSelector((state) => state.theme.mode === 'dark');

  // Toggle the theme and set the class for dark mode in the document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-white dark:bg-slate-900 dark:text-white transition-all w-full">
      <Container>
        <nav className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <Logo width="50px" />
          </Link>
          <ul className="flex items-center gap-4 w-full justify-end">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && <LogoutBtn />}

            {/* Theme Toggle */}
            <li>
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition"
                title="Toggle Theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>

            {/* Language Toggle Placeholder */}
            <li>
              <button className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition" title="Language">
                <Globe2 size={20} />
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
