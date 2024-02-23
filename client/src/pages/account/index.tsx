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
          customerId: user?.customerId || null,
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
          <div className='ml-4 md:mt-16 md:ml-20'>
            <span className='text-white text-2xl md:text-4xl font-medium md:ml-10'>
              Billing and membership
            </span>
          </div>
          <div>
            <div className='rainbow-gradient-circle'></div>
            <div className='rainbow-gradient-circle theme-pink'></div>
          </div>
        </div>

        <div className='rounded-md overflow-hidden bg-[#FFFFFF]/10 mt-4 md:mt-10 mx-4 md:mx-28 h-[620px] md:h-[550px] overflow-y-auto'>
          <div className='mt-4 md:mt-8'>
            <span className='text-white text-2xl md:text-4xl font-medium m-4 md:pl-16'>
              Current Plan
            </span>
          </div>
          <hr className='h-px my-6 m-4 md:ml-16 mr-16 bg-gray-200 ' />
          <div className='flex flex-col w-full -mt-10'>
            {/* @ts-ignore */}
            {subscriptions?.map((subscription: any) =>
              subscription.products.map((product) => (
                <PurchasedProduct
                  key={product.product_id}
                  item={product}
                  customerId={user?.customerId || null}
                />
              ))
            )}
          </div>
        </div>
        <div
          className='flex text-white text-xl gap-3 font-medium justify-center md:justify-end items-center mt-3 md:mr-32 hover:underline hover:cursor-pointer'
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
