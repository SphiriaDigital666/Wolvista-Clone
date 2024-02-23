// ShoppingCartSidebar.tsx
import React from 'react';
import { MdAddShoppingCart, MdClear } from 'react-icons/md';
import CartItem from './Cart-Item';

interface ShoppingCartSidebarProps {
  setShowCart: (value: boolean) => void;
  showCart: boolean;
  cart: any;
  discount: number;
  customerId: any;
  handleDeleteItem: (id: number) => void;
  handleQuantityChange: (id: number, newQuantity: number) => void;
  handleSuccessfulCheckout: () => void;
  handleCheckout: (
    cart: [],
    customerId: string,
    onSuccess?: (() => void) | undefined
  ) => void;
}

const ShoppingCartSidebar: React.FC<ShoppingCartSidebarProps> = ({
  setShowCart,
  showCart,
  cart,
  discount,
  handleDeleteItem,
  handleQuantityChange,
  handleCheckout,
  handleSuccessfulCheckout,
  customerId
}) => {
  const discountedSubtotal =
    cart.reduce((total, item) => total + item.price * item.quantity, 0) -
    discount;

  return (
    <div className={`shopping-cart ${showCart ? 'slide-in' : ''} z-20`}>
      <div className='flex flex-col justify-between h-full'>
        <div>
          <button className='mb-2' onClick={() => setShowCart(false)}>
            <div className='bg-[#000]'>
              <MdClear className='text-[#fff] text-[26px]' />
            </div>
          </button>

          <div>
            <div className='flex items-center justify-between gap-6  mb-8'>
              <h2 className='text-center  text-[#fff] text-[35px] 2xl:text-[35px] xl:text-[30px] lg:text-[26px] md:text-[22px] font-bold'>
                Cart
              </h2>
              <div className='relative'>
                <MdAddShoppingCart className='text-[#fff] text-[35px] ' />
                <div className='text-[#000] bg-[#22c9f2] p-2 rounded-full h-5 w-5 flex justify-center items-center absolute bottom-[-12px] right-[-10px] font-medium'>
                  {cart.length === 0 ? 0 : <span>{cart.length}</span>}
                </div>
              </div>
            </div>
          </div>

          {cart.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onDelete={handleDeleteItem}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <div>
          <div className='flex items-center justify-between'>
            <p className='text-[#fff] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] uppercase'>
              Subtotal{' '}
            </p>

            <p className='text-[#fff] 2xl:text-[20px] xl:text-[18px] lg:text-[16px]'>
              $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
          {discount > 0 && (
            <div className='text-[#fff] flex justify-between'>
              <p>Discount: $</p>

              <p> {discount.toFixed(2)}</p>
            </div>
          )}
          <div className='flex justify-between'>
            <p className='text-[#fff] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] uppercase'>
              Discounted Subtotal:
            </p>

            <p className='text-[#fff] 2xl:text-[20px] xl:text-[18px] lg:text-[16px]'>
              ${discountedSubtotal.toFixed(2)}
            </p>
          </div>
          <button
            className='bg-[#22c9f2] w-full rounded-lg p-3 text-white hover:cursor-pointer hover:bg-[#2690ab] mt-3'
            onClick={() =>
              handleCheckout(cart, customerId, handleSuccessfulCheckout)
            }
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartSidebar;
