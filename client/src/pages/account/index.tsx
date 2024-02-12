import React from 'react';
import { useCurrentUser } from '../../store/authHooks';
import api from '../../utils/api';
const AccountPage = () => {
  const { isAuthenticated, user } = useCurrentUser();
  const handleBillingportal = async () => {
    try {
      const { data } = await api.post('/stripe/billing', {
        customerId: user.customerId,
      });
      window.location.replace(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.firstName} {user.lastName}!</p>
          <p>
            Manage{' '}
            <span
              className='hover:cursor-pointer hover:underline'
              onClick={handleBillingportal}
            >
              Subscription
            </span>
          </p>
        </>
      ) : (
        <p>Please log in to access this feature.</p>
      )}
    </div>
  );
};

export default AccountPage;
