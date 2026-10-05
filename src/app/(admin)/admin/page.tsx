import React from 'react';
import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Helper to disable caching so we always see fresh data in the admin dashboard
export const revalidate = 0;

export default async function AdminDashboard() {
  // Fetch real data from Supabase
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*, order_items(*)');

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*');

  if (ordersError) console.error('Error fetching orders:', ordersError);
  if (productsError) console.error('Error fetching products:', productsError);

  const safeOrders = orders || [];
  const safeProducts = products || [];

  // Stats calculation
  const totalRevenue = safeOrders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = safeOrders.length;
  const totalProducts = safeProducts.length;
  const outOfStock = safeProducts.filter(p => p.stock === 0).length;

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl mb-2">Dashboard Overview</h1>
        <p className="text-neutral-500 text-sm">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 border border-neutral-200 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-brand-cream text-brand-gold rounded-lg">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-neutral-500 text-sm mb-1">Total Revenue</p>
          <h3 className="text-2xl font-semibold">KSh {totalRevenue.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 border border-neutral-200 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-brand-cream text-brand-gold rounded-lg">
              <ShoppingBag size={20} />
            </div>
          </div>
          <p className="text-neutral-500 text-sm mb-1">Total Orders</p>
          <h3 className="text-2xl font-semibold">{totalOrders}</h3>
        </div>

        <div className="bg-white p-6 border border-neutral-200 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-brand-cream text-brand-gold rounded-lg">
              <Package size={20} />
            </div>
          </div>
          <p className="text-neutral-500 text-sm mb-1">Total Products</p>
          <h3 className="text-2xl font-semibold">{totalProducts}</h3>
        </div>

        <div className="bg-white p-6 border border-neutral-200 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-lg">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-neutral-500 text-sm mb-1">Out of Stock</p>
          <h3 className="text-2xl font-semibold">{outOfStock}</h3>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {safeOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                    No orders yet.
                  </td>
                </tr>
              ) : safeOrders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-medium">{order.order_number}</td>
                  <td className="px-6 py-4">{order.customer_full_name}</td>
                  <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">KSh {order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                      order.status === 'processing' ? 'bg-blue-50 text-blue-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
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
