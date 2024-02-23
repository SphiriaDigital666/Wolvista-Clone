import React from 'react';
import CartIcon from '../assets/cart-icon-gradient.png';
import api from '../utils/api';
import './product.css';

interface PurchasedProductProps {
  item: any;
  customerId: string;
  //   onAddToCart: (id: number) => void;
}

const PurchasedProduct: React.FC<PurchasedProductProps> = ({
  item,
  customerId,
}) => {
  const handleBillingPortal = async () => {
    try {
      const { data } = await api.post('/stripe/portal', {
        customerId,
      });
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='z-10'>
      <div className='snip1265 flex justify-center'>
        <div className='md:flex md:justify-between plan'>
          <div className='md:w-full'>
            <header>
              <i className=''>
                <img src={CartIcon} alt='' className='mx-auto' />
              </i>

              <h4 className='plan-title'>{item?.product_name}</h4>
            </header>
            <div className='ml-9'>
              <ul className='plan-features'>
                {item?.features?.map((feature, index) => (
                  <li key={index}>{feature?.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center pb-3 md:justify-end md:items-end md:mr-16 md:mb-12 w-full text-gray-500'>
            <span className='plan-price'>
              ${(item?.unit_amount / 100).toFixed(2)}
            </span>
            <span className='plan-type'>/month</span>
            <h3
              className='text-white hover:underline hover:cursor-pointer'
              onClick={() => handleBillingPortal()}
            >
              Manage Payment plan
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedProduct;
