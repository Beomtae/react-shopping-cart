import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { PaginationResponse } from '../../../../api/type';
import { CartItemType } from '../types';
import useFetch from '../hooks/useFetch';

interface CartContextValue {
  cartItems: CartItemType[];
  fetch: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const fetcher = useFetch<PaginationResponse<CartItemType>>();

  const fetch = useCallback(async () => {
    const data = await fetcher('/cart-items?page=0&size=20');
    if (data) setCartItems(data.content);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <CartContext.Provider value={{ cartItems, fetch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('CartContext not found!');
  return ctx;
}
