import React from "react";
import { MdClear } from "react-icons/md";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  onDelete: (id: number) => void;
  onQuantityChange: (id: number, newQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  onDelete,
  onQuantityChange,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(id, newQuantity);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button onClick={() => onDelete(id)}>
          {" "}
          <MdClear className="text-[#fff] text-[26px] mb-2 mt-2" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[#ececec] text-[20px] mb-2">{name}</p>
        <p className="text-[#ececec] text-[20px]">
          ${(price * quantity).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-[#898989] font-medium">Quantity: {quantity}</p>
        <div className="bg-[#000] text-[#fff] px-2 py-[1px]">
          <button
            className="pr-3"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity === 1}
          >
            -
          </button>
          {/* <span>{quantity}</span> */}
          <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
