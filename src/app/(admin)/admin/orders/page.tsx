'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    } else {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } else {
      alert('Failed to update status');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading orders...</div>;
  }

  return (
    <div className="flex-1 overflow-auto p-8 bg-neutral-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl mb-2">Orders</h1>
          <p className="text-neutral-500 text-sm">Manage all store orders and update their fulfillment status.</p>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-neutral-500">
                    No orders found.
                  </td>
                </tr>
              ) : orders.map(order => (
                <tr key={order.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-medium">{order.order_number}</td>
                  <td className="px-6 py-4">
                    <p>{order.customer_full_name}</p>
                    <p className="text-xs text-neutral-400">{order.customer_email || 'No email'}</p>
                  </td>
                  <td className="px-6 py-4">{order.order_items?.reduce((acc: any, item: any) => acc + item.quantity, 0) || 0} items</td>
                  <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">KSh {order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                      order.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                      order.status === 'processing' ? 'bg-blue-50 text-blue-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="border border-neutral-200 text-xs px-2 py-1 rounded focus:outline-none focus:border-brand-gold bg-white"
                    >
                      <option value="processing">Processing</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
