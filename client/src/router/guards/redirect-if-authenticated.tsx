import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const RedirectIfAuthenticated: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={user.subscription ? '/account' : '/plans'} />;
  }

  return (
    <div className='w-full h-screen overflow-auto bg-[#060606] flex items-center justify-center'>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RedirectIfAuthenticated;
