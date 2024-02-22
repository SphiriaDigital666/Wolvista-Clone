import { PlusIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../src/components/leaklight.css';
import PurchasedProduct from '../../components/PurchasedProducts';
import { useCurrentUser } from '../../store/authHooks';
import api from '../../utils/api';

const Account = () => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      try {
        const { data } = await api.post('/stripe/subscriptions', {
          customerId: user.customerId,
        });
        setSubscriptions(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserSubscriptions();
  }, []);

  return (
    <div className='container bg-[#060606] h-max mt-5 mx-auto'>
      <section>
        <div>
          <div className='rainbow-gradient-circle'></div>
          <div className='rainbow-gradient-circle theme-pink'></div>
        </div>

        <div>
          <div className='mt-16 ml-20'>
            <span className='text-white text-4xl font-medium md:ml-10'>
              Billing and membership
            </span>
          </div>
          <div>
            <div className='rainbow-gradient-circle'></div>
            <div className='rainbow-gradient-circle theme-pink'></div>
          </div>
        </div>

        <div className='rounded-md overflow-hidden bg-[#FFFFFF]/20 mt-10 mx-28 h-[550px] overflow-y-auto'>
          <div className='mt-8'>
            <span className='text-white text-4xl font-medium pl-16'>
              Current Plan
            </span>
          </div>
          <hr className='h-px my-6 ml-16 mr-16 bg-gray-200 ' />
          <div className='flex flex-col w-full -mt-10 md:gap-y-16'>
            {/* @ts-ignore */}
            {subscriptions?.map((subscription: any) =>
              subscription.products.map((product) => (
                <PurchasedProduct
                  key={product.product_id}
                  item={product}
                  customerId={user.customerId}
                />
              ))
            )}
          </div>
        </div>
        <div
          className='flex text-white text-xl gap-3 font-medium justify-end items-center mt-3 mr-32 hover:underline hover:cursor-pointer'
          onClick={() => navigate('/plans')}
        >
          <PlusIcon />
          <span>Add New product</span>
        </div>
      </section>
    </div>
  );
};

export default Account;
