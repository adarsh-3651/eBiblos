import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Components (these would typically be in separate files)
const Container = ({ children }) => (
  <div className="w-full max-w-7xl mx-auto px-4">{children}</div>
);

const Logo = ({ width }) => (
  <img 
    src="/logo.png" 
    alt="Logo" 
    width={width} 
    className="h-auto"
  />
);

const LogoutBtn = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    navigate('/login');
  };
  
  return (
    <button
      onClick={handleLogout}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
};

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className='py-3 shadow bg-white sticky top-0 z-50'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='50px' />
            </Link>
          </div>
          <ul className='flex ml-auto gap-1'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;