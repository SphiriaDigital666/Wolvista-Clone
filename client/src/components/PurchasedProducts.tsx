import React from 'react';
import './product.css';
import CartIcon from '../assets/cart-icon-gradient.png';

interface PurchasedProductProps {
  item: any;
  //   onAddToCart: (id: number) => void;
}

const PurchasedProduct: React.FC<PurchasedProductProps> = ({ item }) => {
  return (
    <div className="z-10">
      <div className="snip1265 flex justify-center">
        <div className="flex justify-between plan">
          <div className="w-full">
            <header>
              <i className="">
                <img src={CartIcon} alt="" className="mx-auto" />
              </i>

              <h4 className="plan-title">{item.product.name}</h4>
            </header>
            <div className="ml-9">
              <ul className="plan-features">
                {item.product.features.map((feature, index) => (
                  <li key={index}>{feature.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end mr-16 mb-12 w-full text-gray-500">
            <span className="plan-price">
              ${(item.unit_amount / 100).toFixed(2)}
            </span>
            <span className="plan-type">/month</span>
            <h3 className="text-white hover:underline hover:cursor-pointer">
              Manage Payment plan
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedProduct;
