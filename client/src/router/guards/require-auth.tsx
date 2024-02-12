import { jwtDecode } from 'jwt-decode';
import { FC } from 'react';
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('userInfo') || '{}');

  // Check if the token is expired
  let isTokenExpired = false;

  if (storedUser.token) {
    try {
      const decodedToken = jwtDecode(storedUser.token);
      if (decodedToken.exp! * 1000 < Date.now()) {
        isTokenExpired = true;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return isTokenExpired ? (
    <div className='flex flex-col justify-center items-center h-full'>
      <h2 className='text-red-500 mb-2'>
        Session expired. Please log in again.
      </h2>
      <button onClick={() => navigate('/')}>Login</button>
    </div>
  ) : storedUser.token ? (
    <>{children}</>
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default RequireAuth;
