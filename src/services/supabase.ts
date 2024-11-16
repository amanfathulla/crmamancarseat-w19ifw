import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Tables = {
  customers: {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    carModel: string;
    orders: any[];
    createdAt: string;
    totalSales: number;
    totalGrossProfit: number;
  };
  prospects: {
    id: string;
    name: string;
    phone: string;
    carModel: string;
    location: string;
    createdAt: string;
  };
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price2Seater: number;
    price5Seater: number;
    price7Seater: number;
    cost2Seater: number;
    cost5Seater: number;
    cost7Seater: number;
    totalSales: number;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
  };
  sales: {
    id: string;
    year: number;
    total: number;
    customColumns?: Array<{
      id: string;
      name: string;
      value: number;
    }>;
  };
  marketing_contents: {
    id: string;
    date: string;
    contents: Array<{
      id: string;
      title: string;
      description: string;
      platform: string;
      status: string;
      time: string;
    }>;
    created_at: string;
    user_id: string;
  };
};