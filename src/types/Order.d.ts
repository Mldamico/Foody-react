export interface Order {
  id: string;
  customer: string;
  status: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: Date;
  cart: Cart[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
}
