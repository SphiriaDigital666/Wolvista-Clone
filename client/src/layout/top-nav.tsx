import {
  Button,
  Collapse,
  IconButton,
  MobileNav,
  Navbar,
} from '@material-tailwind/react';
import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LOGO from '../assets/logo-maple-white.png';
import { useAuthStore } from '../store/authStore';
import { useShoppingCartStore } from '../store/shoppingCartStore';
import api from '../utils/api';

export function TopNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openNav, setOpenNav] = React.useState(false);

  const { setShowCart, cart } = useShoppingCartStore();
  const { isAuthenticated, logout } = useAuthStore();

  const handleCartClick = () => {
    setShowCart(true);
  };

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleSignout = async () => {
    try {
      await api.post('/auth/logout');
      logout();
      navigate('/');
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error(error);
    }
  };

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Link to='www.wolvista.com'>
        {/* <p className="text-gray-600 font-medium">Home</p> */}
      </Link>
    </ul>
  );

  return (
    <Navbar className='mx-auto w-full py-2 px-4 lg:px-8 lg:py-4 shadow-none bg-transparent border-none'>
      <div className='mx-auto flex items-center justify-between text-blue-gray-900'>
        <Link to='/plans'>
          <img src={LOGO} className='w-[150px]' alt='MapleVistaa' />
        </Link>
        <div className='flex-grow' />
        <div className='hidden lg:block'>{navList}</div>
        <div className='flex-grow' />
        {isAuthenticated ? (
          <>
            {pathname !== '/account' && (
              <button
                className='text-white p-3 relative flex items-center focus:outline-none'
                onClick={handleCartClick}
              >
                <MdShoppingCart className='h-6 w-6' />

                {cart.length > 0 && (
                  <div className='text-[#000] bg-[#22c9f2] p-2 rounded-full h-5 w-5 flex justify-center items-center absolute top-0 right-0 font-medium'>
                    {cart.length === 0 ? 0 : <span>{cart.length}</span>}
                  </div>
                )}
              </button>
            )}
            {pathname === '/plans' && (
              <Button
                variant='text'
                size='sm'
                className='hidden lg:inline-block mr-2 text-btn'
                onClick={() => navigate('/account')}
              >
                <span className=' text-white'>Account</span>
              </Button>
            )}

            <Button
              variant='text'
              size='sm'
              className='hidden lg:inline-block mr-2 text-btn'
              onClick={handleSignout}
            >
              <span className=' text-white'>Logout</span>
            </Button>
          </>
        ) : (
          <Button
            variant='text'
            size='sm'
            className='hidden lg:inline-block mr-2 text-btn'
            onClick={() => navigate('/')}
          >
            <span className=' text-black'>Login</span>
          </Button>
        )}

        <IconButton
          variant='text'
          className=' h-6 w-6 text-white ml-2 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              className='h-6 w-6'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className='container mx-auto'>
          {navList}
          <div className='grid grid-cols-2 gap-2'>
            <Button
              variant='gradient'
              size='sm'
              fullWidth
              className='rounded-btn'
              onClick={handleSignout}
            >
              <span className=' text-white'>
                {isAuthenticated ? 'Logout' : 'Login'}
              </span>
            </Button>
            {pathname === '/account' && (
              <Button
                variant='outlined'
                size='sm'
                fullWidth
                className='rounded-btn'
                onClick={() => navigate('/plans')}
              >
                <span className='text-white'>Plans</span>
              </Button>
            )}
            {pathname === '/plans' && (
              <Button
                variant='outlined'
                size='sm'
                fullWidth
                className='rounded-btn'
                onClick={() => navigate('/account')}
              >
                <span className='text-white'>Account</span>
              </Button>
            )}
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
