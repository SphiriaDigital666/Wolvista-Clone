import React, { useEffect } from 'react';
import CartItem from './Cart-Item';
import Product from './Product';
import './ShoppingCart.css';
import './leaklight.css';

import { MdAddShoppingCart, MdClear } from 'react-icons/md';
import { useShoppingCartStore } from '../store/shoppingCartStore';
import { useAuthStore } from '../store/authStore';

const ShoppingCart: React.FC = () => {
  const {
    cart,
    // couponCode,
    discount,
    // couponMessage,
    showCart,
    products,
    fetchProducts,
    handleAddToCart,
    handleDeleteItem,
    handleQuantityChange,
    // handleCouponCodeChange,
    // handleApplyCoupon,
    handleCheckout,
    setShowCart,
    clearCart,
  } = useShoppingCartStore();

  const { user } = useAuthStore();
  const customerId = user.customerId;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const discountedSubtotal =
    cart.reduce((total, item) => total + item.price * item.quantity, 0) -
    discount;

  const handleSuccessfulCheckout = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto">
      {/* --------------------------------------------------------  Main content starts here -------------------------------------------------------------------------------- */}
      <div>
        {/* <h1 className="text-white ml-5 md:ml-10">Product List</h1> */}
        <span className="text-white text-2xl md:text-4xl p-4 font-medium md:ml-10">
          Choose a plan to subscribe,
        </span>
        <div>
          <div className="rainbow-gradient-circle"></div>
          <div className="rainbow-gradient-circle theme-pink"></div>
        </div>
      </div>

      <div className="flex flex-col p-2 w-[370px] md:w-full md:grid md:grid-cols-3 md:gap-y-16">
        {products.map((product) => (
          <Product
            key={product.id}
            item={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------ Shopping cart sidebar starts here ----------------------------------------------------------------------- */}
      <div className={`shopping-cart ${showCart ? 'slide-in' : ''} z-20`}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <button className="mb-2" onClick={() => setShowCart(false)}>
              <div className="bg-[#000]">
                {' '}
                <MdClear className="text-[#fff] text-[26px]" />
              </div>
            </button>

            <div>
              <div className="flex items-center justify-center gap-6  mb-8">
                <h2 className="text-center  text-[#fff] text-[35px] font-bold">
                  Shopping Cart
                </h2>
                <div className="relative">
                  <MdAddShoppingCart className="text-[#fff] text-[35px] " />
                  <div className="text-[#000] bg-[#22c9f2] p-2 rounded-full h-5 w-5 flex justify-center items-center absolute bottom-[-12px] right-[-10px] font-medium">
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
            {/* <div>
              <div className='flex items-center justify-between mb-2'>
                <label htmlFor='coupon' className='text-[#fff]'>
                  Coupon Code:
                </label>
                <input
                  type='text'
                  id='coupon'
                  className='rounded'
                  value={couponCode}
                  onChange={(e) => {
                    handleCouponCodeChange(e.target.value);
                  }}
                />
              </div>

              <div className='flex justify-end mb-4'>
                <button
                  onClick={handleApplyCoupon}
                  className='text-[#fff] border-2 border-[#22c9f2] rounded px-2 py-0.5'
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
            </div> */}

            <div className="flex items-center justify-between">
              <p className="text-[#fff] text-[20px] uppercase">Subtotal </p>

              <p className="text-[#fff] text-[20px]">
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
              <div className="text-[#fff] flex justify-between">
                <p>Discount: $</p>

                <p> {discount.toFixed(2)}</p>
              </div>
            )}
            <div className="flex justify-between">
              <p className="text-[#fff] text-[20px] uppercase">
                Discounted Subtotal:
              </p>

              <p className="text-[#fff] text-[20px]">
                ${discountedSubtotal.toFixed(2)}
              </p>
            </div>
            <button
              className="bg-[#22c9f2] w-full rounded-lg p-3 text-white hover:cursor-pointer hover:bg-[#2690ab] mt-3"
              onClick={() =>
                handleCheckout(cart, customerId, handleSuccessfulCheckout)
              }
              disabled={cart.length === 0}
            >
              Checkout
            </button>
            {/* <stripe-buy-button
              buy-button-id='buy_btn_1OhzJXGp1WWvZ4zJisjPKNja'
              publishable-key='pk_test_51OhuhHGp1WWvZ4zJ8BpJu2VOQZPLw3SHMFBCED97YHKfhXCfbomMfigIOpcsuCdTTkGmiJiDX8yYrBCXIqSZTbK500Uqsjs82L'
            ></stripe-buy-button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
