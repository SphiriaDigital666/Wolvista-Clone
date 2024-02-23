import React, { useEffect } from 'react';
import Product from './Product';
import './ShoppingCart.css';
import './leaklight.css';

import { useAuthStore } from '../store/authStore';
import { useShoppingCartStore } from '../store/shoppingCartStore';
import ShoppingCartSidebar from './ShoppingCartSidebar';

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
  const customerId = user?.customerId || null;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // const discountedSubtotal =
  //   cart.reduce((total, item) => total + item.price * item.quantity, 0) -
  //   discount;

  const handleSuccessfulCheckout = () => {
    clearCart();
  };

  return (
    <div className='container mx-auto'>
      {/* --------------------------------------------------------  Main content starts here -------------------------------------------------------------------------------- */}
      <div>
        {/* <h1 className="text-white ml-5 md:ml-10">Product List</h1> */}
        <span className='text-white text-2xl md:text-4xl p-4 font-medium md:ml-10'>
          Choose a plan to subscribe,
        </span>
        <div>
          <div className='rainbow-gradient-circle'></div>
          <div className='rainbow-gradient-circle theme-pink'></div>
        </div>
      </div>

      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1'>
        {products.map((product) => (
          <Product
            key={product.id}
            item={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------ Shopping cart sidebar starts here ----------------------------------------------------------------------- */}
      <ShoppingCartSidebar
        cart={cart}
        customerId={customerId}
        discount={discount}
        handleCheckout={handleCheckout}
        handleDeleteItem={handleDeleteItem}
        handleQuantityChange={handleQuantityChange}
        handleSuccessfulCheckout={handleSuccessfulCheckout}
        setShowCart={setShowCart}
        showCart={showCart}
      />
    </div>
  );
};

export default ShoppingCart;
