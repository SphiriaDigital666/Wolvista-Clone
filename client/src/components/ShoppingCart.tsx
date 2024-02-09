import React, { useState } from "react";
import Product from "./Product";
import CartItem from "./Cart-Item";
import "./ShoppingCart.css"; // Import the CSS file for styling

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  features: string[];
}

interface CartItemWithQuantity extends ProductDetails {
  quantity: number;
}

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<CartItemWithQuantity[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>("");
  const [showCart, setShowCart] = useState<boolean>(false);

  const products: ProductDetails[] = [
    {
      id: 1,
      name: "Kick Starter",
      price: 59,
      features: [
        "Digital Graphic",
        "Changers Per Graphic",
        " Free Artwork Files",
        "Upto 1 Day Turn Around Time (24 Hours)",
        "2 Active Requests",
        "Free Stock Images",
      ],
    },
    {
      id: 2,
      name: "Kick Starter Plus",
      price: 99,
      features: [
        "Free Social Branding",
        "4 Digital Graphic Requests",
        "4 Changes Per Requests",
        "Free Artwork Files",
        "Upto 1 Day Turn Around Time (24 Hours)",
        "2 Active Requests",
        "Free Stock Images",
      ],
    },
    {
      id: 3,
      name: "Graphics on Demand",
      price: 1999,
      features: [
        "Infinity Graphics",
        "Infinity Changes",
        "Free Artwork Files",
        "Upto 1 Day Turn Around Time (24 Hours)",
        "6 Active Requests",
        "Basic Gifs Included",
        "Free Stock Images",
      ],
    },
    {
      id: 4,
      name: "Video on Demand",
      price: 2499,
      features: [
        "Infinity Videos",
        "Infinity Changes",
        "Free Artwork Files",
        "Up to 2 to 4 Day Turn Around Time",
        "3 Active Requests",
        "Free Stock Images",
      ],
    },
    {
      id: 5,
      name: "Advanced Plan",
      price: 3499,
      features: [
        "Infinity Graphics & Videos",
        "Infinity Changes",
        "Free Artwork Files",
        "Up to 1 Day Turn Around Time for Graphics",
        "Up to 2 to 4 Day Turn Around Time for Videos",
        "3 Active Video Requests",
        "6 Active Graphic Requests",
        "Free Stock Images",
      ],
    },
  ];

  const handleAddToCart = (id: number) => {
    const existingItemIndex = cart.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      });
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id,
          name: products.find((product) => product.id === id)?.name || "",
          price: products.find((product) => product.id === id)?.price || 0,
          features:
            products.find((product) => product.id === id)?.features || [],
          quantity: 1,
        },
      ]);
    }

    setCartTotal((prevTotal) => prevTotal + 1);

    setShowCart(true);
  };

  const handleDeleteItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    setCartTotal((prevTotal) => prevTotal - 1);

    if (cart.length === 1) {
      setShowCart(false);
    }
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleApplyCoupon = () => {
    if (couponCode === "#wolvista5") {
      setDiscount(15);
      setCouponMessage(
        "Congratulations! You have got $15 discount with your coupon."
      );
    } else {
      setDiscount(0);
      setCouponMessage("Your coupon code is incorrect.");
    }
  };

  const discountedSubtotal =
    cart.reduce((total, item) => total + item.price * item.quantity, 0) -
    discount;

  return (
    <div className="container mx-auto">
      {/* --------------------------------------------------------  Main content starts here -------------------------------------------------------------------------------- */}
      <h1>Product List</h1>

      <div className="grid grid-cols-3 gap-y-16 ">
        {products.map((product) => (
          <Product
            key={product.id}
            {...product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------ Shopping cart sidebar starts here ----------------------------------------------------------------------- */}
      <div className={`shopping-cart ${showCart ? "slide-in" : ""}`}>
        <button className="mb-2" onClick={() => setShowCart(false)}>
          Close
        </button>
        <h2>
          Shopping Cart{" "}
          {cartTotal > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 ml-2">
              {cartTotal}
            </span>
          )}
        </h2>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onDelete={handleDeleteItem}
            onQuantityChange={handleQuantityChange}
          />
        ))}
        <div>
          <label htmlFor="coupon">Coupon Code:</label>
          <input
            type="text"
            id="coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button onClick={handleApplyCoupon}>Apply Coupon</button>
          {couponMessage && <p>{couponMessage}</p>}
        </div>
        <p>
          Subtotal: $
          {cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
        {discount > 0 && <p>Discount: ${discount.toFixed(2)}</p>}
        <p>Discounted Subtotal: ${discountedSubtotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ShoppingCart;
