import React from "react";

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
      <p>{name}</p>
      <p>Quantity: {quantity}</p>
      <p>${(price * quantity).toFixed(2)}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
      <div>
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity === 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
