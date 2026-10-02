'use client';

import { useState } from 'react';
import { Package, Car, TrendingUp, Clock, Search, Filter, MoreVertical, Phone, MessageCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockParcels, mockRentals } from '@/lib/mockData';
import { formatMalotiCompact, formatDateTime } from '@/lib/utils';
import { Parcel, Rental } from '@/types';

type FilterType = 'all' | 'parcels' | 'rentals' | 'pending' | 'in-transit';

export default function AdminDashboard() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const metrics = [
    { label: 'Active Deliveries', value: mockParcels.filter(p => p.status !== 'delivered').length, icon: Package, trend: '+14% this week', color: 'purple' },
    { label: 'Vehicles Rented', value: mockRentals.filter(r => r.status === 'active').length, icon: Car, trend: '8 / 12 Fleet Units', color: 'blue' },
    { label: "Today's Revenue", value: 'M 18,450.00', icon: TrendingUp, trend: '+8% vs yesterday', color: 'emerald' },
    { label: 'Pending Pickups', value: mockParcels.filter(p => p.status === 'picked_up').length, icon: Clock, trend: 'Next run: Tue', color: 'amber' },
  ];

  const allOrders = [...mockParcels, ...mockRentals];
  
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      ('trackingCode' in order && order.trackingCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ('clientName' in order && order.clientName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    switch (filter) {
      case 'parcels':
        return 'destination' in order;
      case 'rentals':
        return 'vehicleModel' in order;
      case 'pending':
        return 'paymentStatus' in order && order.paymentStatus === 'pending';
      case 'in-transit':
        return 'status' in order && (order.status === 'in_transit' || order.status === 'active');
      default:
        return true;
    }
  });

  const colorClasses = {
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-brand-primary">Admin Control Center</h1>
          <p className="text-brand-secondary mt-1">Manage orders, rentals, and fleet operations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colorClasses[metric.color as keyof typeof colorClasses]} border flex items-center justify-center`}>
                    <Icon size={24} className={colorClasses[metric.color as keyof typeof colorClasses].split(' ')[1]} />
                  </div>
                  <span className="text-sm text-brand-secondary">{metric.trend}</span>
                </div>
                <div className="text-2xl font-bold text-brand-primary">{metric.value}</div>
                <div className="text-sm text-brand-secondary mt-1">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-bold text-brand-primary">Orders & Rentals</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-sm w-64"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-slate-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                    className="px-3 py-2 rounded-xl border border-slate-300 focus:border-purple-600 text-sm bg-white"
                  >
                    <option value="all">All Orders</option>
                    <option value="parcels">Parcels Only</option>
                    <option value="rentals">Rentals Only</option>
                    <option value="pending">Pending Payment</option>
                    <option value="in-transit">In Transit</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-secondary uppercase tracking-wider">Tracking Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-secondary uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-secondary uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-secondary uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-secondary uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-purple-600">
                        {order.trackingCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-brand-primary">{order.clientName}</div>
                        <a href={`tel:${order.phone}`} className="text-sm text-brand-secondary hover:text-purple-600 flex items-center space-x-1">
                          <Phone size={14} />
                          <span>{order.phone}</span>
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${
                        'destination' in order ? colorClasses.purple : colorClasses.blue
                      } border`}>
                        {'destination' in order ? 'Parcel' : order.vehicleType === '7-seater' ? '7-Seater' : 'Truck'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-brand-secondary capitalize">{order.paymentMethod.replace('-', ' ')}</div>
                      <div className={`text-xs font-medium ${order.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {order.paymentStatus.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-brand-primary">
                      {formatMalotiCompact('amount' in order ? order.amount : order.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      {'status' in order && (
                        <select
                          defaultValue={order.status}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm bg-white focus:border-purple-600"
                        >
                          {'destination' in order ? (
                            <>
                              <option value="picked_up">Picked Up</option>
                              <option value="in_transit">In Transit</option>
                              <option value="at_hub">At Hub</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                            </>
                          ) : (
                            <>
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                              <option value="overdue">Overdue</option>
                            </>
                          )}
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors" title="Edit">
                          <MoreVertical size={18} className="text-slate-400" />
                        </button>
                        <a
                          href={`https://wa.me/${order.phone.replace('+', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                          title="WhatsApp"
                        >
                          <MessageCircle size={18} className="text-green-600" />
                        </a>
                        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors" title="Download Receipt">
                          <Download size={18} className="text-slate-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-12 text-center">
              <Package size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-brand-secondary">No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
