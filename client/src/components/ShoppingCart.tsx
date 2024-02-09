import React, { useEffect } from 'react';
import { MdVerified } from 'react-icons/md';
import CartItem from './Cart-Item';
import Product from './Product';
import './ShoppingCart.css'; // Import the CSS file for styling

import { MdAddShoppingCart, MdClear } from 'react-icons/md';
import { useShoppingCartStore } from '../store/shoppingCartStore';
import api from '../utils/api';

const ShoppingCart: React.FC = () => {
  const {
    cart,
    couponCode,
    cartTotal,
    discount,
    couponMessage,
    showCart,
    products,
    fetchProducts,
    handleAddToCart,
    handleDeleteItem,
    handleQuantityChange,
    handleCouponCodeChange,
    handleApplyCoupon,
    handleCheckout,
    setShowCart,
  } = useShoppingCartStore();
  console.log('🚀 ~ cart:', cart);

  useEffect(() => {
    fetchProducts();
  }, []);

  const discountedSubtotal =
    cart.reduce((total, item) => total + item.price * item.quantity, 0) -
    discount;

  // const handleCheckout = async () => {
  //   try {
  //     await api.post('/stripe/checkout', {
  //       cart
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='container mx-auto '>
      {/* --------------------------------------------------------  Main content starts here -------------------------------------------------------------------------------- */}
      <h1>Product List</h1>

      <div className='grid grid-cols-3 gap-y-16 '>
        {products.map((product) => (
          <Product
            key={product.id}
            item={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------ Shopping cart sidebar starts here ----------------------------------------------------------------------- */}
      <div className={`shopping-cart ${showCart ? 'slide-in' : ''}`}>
        <div className='flex flex-col  justify-between  h-full'>
          <div>
            <button className='mb-2' onClick={() => setShowCart(false)}>
              <div className='bg-[#000]'>
                {' '}
                <MdClear className='text-[#fff] text-[26px]' />
              </div>
            </button>

            <div>
              <div className='flex items-center justify-center gap-6  mb-8'>
                <h2 className='text-center  text-[#fff] text-[35px]'>
                  Shopping Cart
                </h2>
                <div className='relative'>
                  <MdAddShoppingCart className='text-[#fff] text-[35px] ' />
                  <div className='text-[#000] bg-[#22c9f2] p-2 rounded-full h-5 w-5 flex justify-center items-center absolute bottom-[-12px] right-[-10px] font-medium'>
                    {cartTotal > 0 && <span>{cartTotal}</span>}
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
            <div>
              <div className='flex items-center justify-between mb-2'>
                <label htmlFor='coupon' className='text-[#ececec]'>
                  Coupon Code:
                </label>
                <input
                  type='text'
                  id='coupon'
                  className='rounded'
                  value={couponCode}
                  onChange={(e) => {
                    // setCouponCode(e.target.value);
                    handleCouponCodeChange(e.target.value);
                  }}
                />
              </div>

              <div className='flex justify-end mb-4'>
                <button
                  onClick={handleApplyCoupon}
                  className='text-[#ececec] border-2 border-[#22c9f2] rounded px-2 py-0.5'
                >
                  Apply Coupon
                </button>
              </div>

              {couponMessage && (
                <div className='flex items-center gap-2 border border-[#4ab866] bg-[#f4fff7] rounded-md p-3 mb-5'>
                  <MdVerified className='text-[20px] text-[#4ab866]' />
                  <p className='text-[#1b1a20] text-[14px] font-normal'>
                    {couponMessage}
                  </p>
                </div>
              )}
            </div>

            <div className='flex items-center justify-between'>
              <p className='text-[#ececec] text-[20px] uppercase'>Subtotal </p>

              <p className='text-[#ececec] text-[20px]'>
                $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            {discount > 0 && (
              <div className='text-[#ececec] flex justify-between'>
                <p>Discount: $</p>

                <p> {discount.toFixed(2)}</p>
              </div>
            )}
            <div className='flex justify-between'>
              <p className='text-[#ececec] text-[20px] uppercase'>
                Discounted Subtotal:
              </p>

              <p className='text-[#ececec] text-[20px]'>
                ${discountedSubtotal.toFixed(2)}
              </p>
            </div>
            <button
              className='bg-[#22c9f2] w-full rounded-lg p-3 text-white hover:cursor-pointer hover:bg-[#2690ab] mt-3'
              onClick={() => handleCheckout(cart)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
