import React from "react";
import "./product.css";
import CartIcon from "../assets/cart-icon-gradient.png";

interface ProductProps {
  item: any;
  onAddToCart: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({ item, onAddToCart }) => {
  return (
    <div className="z-10">
      {/* <div className="bg-[#ffe1c8]">
        <h2 className="bg-[#e7ffc8] font-bold text-[30px]">{name}</h2>
        <p>${price.toFixed(2)}</p>
        <button onClick={() => onAddToCart(id)}>Add to Cart</button>
      </div> */}

      <div className="snip1265 flex justify-center">
        <div className="plan 2xl:w-[405px] xl:w-[350px] lg:w-[320px] md:w-[300px] sm:w-[280px] w-[400px] mb-16 mr-6">
          <header>
            <i className="">
              <img
                src={CartIcon}
                alt=""
                className="2xl:w-[60px] xl:w-[50px] mx-auto"
              />
            </i>
            <h4 className="plan-title text-[20px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px]">
              {item.product.name}
            </h4>
            <div className="plan-cost">
              <span className="plan-price">
                ${(item.unit_amount / 100).toFixed(2)}
              </span>
              <span className="plan-type">/month</span>
            </div>
          </header>
          <ul className="plan-features">
            {item.product.features.map((feature, index) => (
              <li key={index}>{feature.name}</li>
            ))}
          </ul>
          <div className="plan-select absolute bottom-[0px] w-full">
            <div
              className="select-plan"
              onClick={() => onAddToCart(item.id)}
            >
              Purchase Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
