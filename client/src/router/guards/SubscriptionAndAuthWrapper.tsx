import React, { FC } from 'react';
import SubscriptionGuard from './subscription-guard';
import RequireAuth from './require-auth';

const SubscriptionAndAuthWrapper: FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <RequireAuth>
    <SubscriptionGuard>{children}</SubscriptionGuard>
  </RequireAuth>
);

export default SubscriptionAndAuthWrapper;
