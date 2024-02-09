// shoppingCartStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import api from '../utils/api';

interface ShoppingCartStore {
  cart: any;
  cartTotal: number;
  couponCode: string;
  discount: number;
  couponMessage: string;
  showCart: boolean;
  products: any;
  fetchProducts: () => void;
  handleAddToCart: (id: number) => void;
  handleDeleteItem: (id: number) => void;
  handleQuantityChange: (id: number, newQuantity: number) => void;
  handleApplyCoupon: () => void;
  handleCouponCodeChange: (value: string) => void;
  handleCheckout: (cart: []) => void;
  setShowCart: (value: boolean) => void;
}

export const useShoppingCartStore = create<ShoppingCartStore>(
  persist(
    (set) => ({
      cart: [],
      cartTotal: 0,
      couponCode: '',
      discount: 0,
      couponMessage: '',
      showCart: false,
      products: [],
      fetchProducts: async () => {
        try {
          const { data } = await api.get('/stripe/config');
          set({ products: data.prices });
        } catch (err) {
          console.log(err);
        }
      },
      handleAddToCart: (id: number) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.id === id
          );

          if (existingItemIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + 1,
            };

            return {
              ...state,
              cart: updatedCart,
              cartTotal: state.cartTotal + 1,
              showCart: true,
            };
          } else {
            const newProduct = state.products.find(
              (product) => product.id === id
            );
            if (newProduct) {
              const updatedCart = [
                ...state.cart,
                {
                  id,
                  name: newProduct.product.name,
                  price: newProduct.unit_amount / 100,
                  features: newProduct.product.features,
                  quantity: 1,
                },
              ];

              return {
                ...state,
                cart: updatedCart,
                cartTotal: state.cartTotal + 1,
                showCart: true,
              };
            }
          }

          return state;
        });
      },
      handleDeleteItem: (id: number) => {
        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== id);

          return {
            ...state,
            cart: updatedCart,
            cartTotal: state.cartTotal - 1,
            showCart: updatedCart.length > 0, // Set showCart to true if there are items in the cart, false otherwise
          };
        });
      },
      handleQuantityChange: (id: number, newQuantity: number) => {
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );

          return {
            ...state,
            cart: updatedCart,
            cartTotal: updatedCart.reduce(
              (total, item) => total + item.quantity,
              0
            ),
          };
        });
      },
      handleCouponCodeChange: (newCouponCode: string) => {
        set({ couponCode: newCouponCode });
      },
      handleApplyCoupon: () => {
        set((state) => {
          if (state.couponCode === '#wolvista5') {
            return {
              ...state,
              discount: 15,
              couponMessage:
                'Congratulations on your $15 discount with the coupon!',
            };
          } else {
            return {
              ...state,
              discount: 0,
              couponMessage: 'Your coupon code is incorrect.',
            };
          }
        });
      },
      handleCheckout: async (cart: []) => {
        try {
          const response = await api.post('/stripe/checkout', {
            cart,
          });
          window.location.replace(response.data);
        } catch (error) {
          console.log(error);
        }
      },
      setShowCart: (value: boolean) => {
        set({ showCart: value });
      },
    }),
    {
      name: 'shopping-cart-store',
      storage: createJSONStorage(() => {
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          return localStorage;
        } catch (error) {
          return sessionStorage;
        }
      }),
      partialize: (state) => ({ ...state, showCart: false }),
    }
  )
);
