import React from 'react';
import '../../../src/components/leaklight.css';
import { useShoppingCartStore } from '../../store/shoppingCartStore';
import PurchasedProduct from '../../components/PurchasedProducts';
import { PlusIcon } from '@radix-ui/react-icons';
// import { useCurrentUser } from '../../store/authHooks';
// import api from '../../utils/api';

const Account = () => {
  const { products, fetchProducts } = useShoppingCartStore();
  // const { isAuthenticated, user } = useCurrentUser();
  // const handleBillingportal = async () => {
  //   try {
  //     const { data } = await api.post('/stripe/billing', {
  //       customerId: user.customerId,
  //     });
  //     window.location.replace(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    // <div>
    //   {isAuthenticated ? (
    //     <>
    //       <p>Welcome, {user.firstName} {user.lastName}!</p>
    //       <p>
    //         Manage{' '}
    //         <span
    //           className='hover:cursor-pointer hover:underline'
    //           onClick={handleBillingportal}
    //         >
    //           Subscription
    //         </span>
    //       </p>
    //     </>
    //   ) : (
    //     <p>Please log in to access this feature.</p>
    //   )}
    // </div>
    <div className="container bg-[#060606] h-max mt-5 mx-auto">
      <section>
        <div>
          <div className="rainbow-gradient-circle"></div>
          <div className="rainbow-gradient-circle theme-pink"></div>
        </div>

        <div>
          <div className="mt-16 ml-20">
            <span className="text-white text-4xl font-medium md:ml-10">
              Billing and membership
            </span>
          </div>
          <div>
            <div className="rainbow-gradient-circle"></div>
            <div className="rainbow-gradient-circle theme-pink"></div>
          </div>
        </div>

        <div className="rounded-md overflow-hidden bg-[#FFFFFF]/20 mt-10 mx-28 h-[550px] overflow-y-auto">
          <div className="mt-8">
            <span className="text-white text-4xl font-medium pl-16">
              Current Plan
            </span>
          </div>
          <hr className="h-px my-6 ml-16 mr-16 bg-gray-200 " />
          <div className="flex flex-col w-full -mt-10 md:gap-y-16">
            {products.map((product) => (
              <PurchasedProduct
                key={product.id}
                item={product}
                // onAddToCart={fetchProducts}
              />
            ))}
          </div>
        </div>
        <div className="flex text-white text-xl gap-3 font-medium justify-end items-center mt-3 mr-32 hover:underline hover:cursor-pointer">
          <PlusIcon />
          <span>Add New product</span>
        </div>
      </section>
    </div>
  );
};

export default Account;
