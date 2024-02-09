import React from "react";
import "./product.css";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  features: string[];
  onAddToCart: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  price,
  features,
  onAddToCart,
}) => {
  return (
    <div className="">
      {/* <div className="bg-[#ffe1c8]">
        <h2 className="bg-[#e7ffc8] font-bold text-[30px]">{name}</h2>
        <p>${price.toFixed(2)}</p>
        <button onClick={() => onAddToCart(id)}>Add to Cart</button>
      </div> */}

      <div className="snip1265 flex justify-center ">
        <div className="plan ">
          <header>
            <i className="ion-ios-navigate-outline"></i>
            <h4 className="plan-title">{name}</h4>
            <div className="plan-cost">
              <span className="plan-price">${price.toFixed(2)}</span>
              <span className="plan-type">/month</span>
            </div>
          </header>
          <ul className="plan-features">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="plan-select absolute bottom-[0px] w-full ">
            <div className="select-plan" onClick={() => onAddToCart(id)}>
              Select Plan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
