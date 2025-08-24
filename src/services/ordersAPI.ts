import type { Order } from '../types/orders';

const BASE_URL = 'http://localhost:3000';

export class OrdersAPI {
  // Get all orders
  static async getAllOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${BASE_URL}/api/orders`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Get single order by ID
  static async getOrderById(id: string): Promise<Order | null> {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  // Create new order
  static async createOrder(orderData: Omit<Order, 'orderId' | 'batchId' | "dateIssued">): Promise<Order> {
    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Update order (optional - for future use)
  static async updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  // Delete order (optional - for future use)
  static async deleteOrder(id: string): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
}