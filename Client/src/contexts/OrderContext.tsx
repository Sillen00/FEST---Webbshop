import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Product } from './ProductContext';

export interface DeliveryAddress {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: number;
  city: string;
  phoneNumber: string;
}

interface OrderItem {
  productID: Product;
  quantity: number;
}

interface CreateOrderItem {
  productID: string;
  quantity: number;
}

// Skapa en order
interface CreateOrder {
  userID: string;
  totalPrice: number;
  deliveryAddress: DeliveryAddress;
  isShipped: boolean;
  orderItems: CreateOrderItem[];
}

// Hämta information om en order
export interface Order extends Omit<CreateOrder, 'orderItems'> {
  _id: string;
  createdAt: Date;
  orderItems: OrderItem[];
}

interface OrderContextValue {
  order: Order | null;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  createOrder: (order: CreateOrder) => Promise<void>;
  getOrdersByUser: (userId: string) => Promise<Order[]>;
  updateOrderStatus: (orderId: string) => Promise<void>;
  orderStatusUpdated: boolean;
}

export const OrderContext = createContext<OrderContextValue>(null as any);
export const useOrder = () => useContext(OrderContext);

interface Props {
  children: ReactNode;
}

export default function OrderProvider({ children }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [orderStatusUpdated, setOrderStatusUpdated] = useState(false);

  const getOrdersByUser = async (userId: string) => {
    try {
      const response = await axios.get(`/api/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders by user:', error);
      return [];
    }
  };

  const createOrder = async (newOrder: CreateOrder) => {
    try {
      console.log('Creating order:', newOrder);
      const response = await axios.post('/api/orders', newOrder);

      if (response.status === 201) {
        setOrder(response.data);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const updateOrderStatus = async (orderId: string) => {
    try {
      const response = await axios.put(`/api/orders/status/${orderId}`);
      if (response.status === 200) {
        console.log(response);
        setOrderStatusUpdated(prev => !prev);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        order,
        setOrder,
        getOrdersByUser,
        updateOrderStatus,
        orderStatusUpdated,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
