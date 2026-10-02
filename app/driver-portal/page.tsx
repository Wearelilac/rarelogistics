'use client';

import { useState } from 'react';
import { Package, MapPin, Clock, CheckCircle2, AlertCircle, Phone, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockParcels } from '@/lib/mockData';
import { formatDateTime } from '@/lib/utils';

type DeliveryStatus = 'assigned' | 'picked_up' | 'in_transit' | 'delivered';

interface DriverDelivery {
  id: string;
  trackingCode: string;
  clientName: string;
  phone: string;
  address: string;
  status: DeliveryStatus;
  priority: 'normal' | 'urgent';
  notes?: string;
}

export default function DriverPortal() {
  const [deliveries, setDeliveries] = useState<DriverDelivery[]>([
    {
      id: '1',
      trackingCode: 'RL-PRC9823',
      clientName: 'Thabo Mokoena',
      phone: '+266 6210 0202',
      address: '123 Main Street, Maseru',
      status: 'assigned',
      priority: 'normal',
      notes: 'Call before delivery',
    },
    {
      id: '2',
      trackingCode: 'RL-PRC4567',
      clientName: 'Sarah Nkosi',
      phone: '+266 5888 5859',
      address: '45 Central Ave, Maseru Mall',
      status: 'picked_up',
      priority: 'urgent',
      notes: 'Fragile package',
    },
    {
      id: '3',
      trackingCode: 'RL-PRC7890',
      clientName: 'Kgotso Mphahlele',
      phone: '+266 6210 0202',
      address: '78 Pioneer Rd, Maseru',
      status: 'in_transit',
      priority: 'normal',
    },
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState<DriverDelivery | null>(null);

  const updateStatus = (id: string, newStatus: DeliveryStatus) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    ));
  };

  const statusColors = {
    assigned: 'bg-amber-100 text-amber-700 border-amber-200',
    picked_up: 'bg-blue-100 text-blue-700 border-blue-200',
    in_transit: 'bg-purple-100 text-purple-700 border-purple-200',
    delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const statusLabels = {
    assigned: 'Assigned',
    picked_up: 'Picked Up',
    in_transit: 'In Transit',
    delivered: 'Delivered',
  };

  const stats = {
    total: deliveries.length,
    assigned: deliveries.filter(d => d.status === 'assigned').length,
    inProgress: deliveries.filter(d => d.status === 'picked_up' || d.status === 'in_transit').length,
    completed: deliveries.filter(d => d.status === 'delivered').length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">Driver Portal</h1>
          <p className="text-blue-100">Manage your deliveries and routes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="text-3xl font-bold text-brand-primary">{stats.total}</div>
            <div className="text-sm text-brand-secondary">Total Deliveries</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="text-3xl font-bold text-amber-600">{stats.assigned}</div>
            <div className="text-sm text-brand-secondary">Assigned</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-brand-secondary">In Progress</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="text-3xl font-bold text-emerald-600">{stats.completed}</div>
            <div className="text-sm text-brand-secondary">Completed</div>
          </div>
        </div>

        {/* Deliveries List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-brand-primary">Today's Deliveries</h2>
          </div>

          <div className="divide-y divide-slate-200">
            {deliveries.map((delivery) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Package className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-mono font-semibold text-purple-600">{delivery.trackingCode}</span>
                        {delivery.priority === 'urgent' && (
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                            Urgent
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-brand-primary">{delivery.clientName}</h3>
                      <div className="flex items-center space-x-2 text-sm text-brand-secondary mt-1">
                        <MapPin size={16} />
                        <span>{delivery.address}</span>
                      </div>
                      {delivery.notes && (
                        <p className="text-sm text-amber-600 mt-2 flex items-center space-x-1">
                          <AlertCircle size={16} />
                          <span>{delivery.notes}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${statusColors[delivery.status]}`}>
                    {statusLabels[delivery.status]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <a
                      href={`tel:${delivery.phone}`}
                      className="flex items-center space-x-2 text-sm text-brand-secondary hover:text-brand-primary transition-colors"
                    >
                      <Phone size={18} />
                      <span>{delivery.phone}</span>
                    </a>
                    <button className="flex items-center space-x-2 text-sm text-brand-secondary hover:text-brand-primary transition-colors">
                      <Navigation size={18} />
                      <span>Get Directions</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    {delivery.status !== 'assigned' && (
                      <button
                        onClick={() => updateStatus(delivery.id, delivery.status === 'picked_up' ? 'in_transit' : 'picked_up')}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-brand-primary text-sm font-medium transition-colors"
                      >
                        {delivery.status === 'picked_up' ? 'Mark In Transit' : 'Mark Picked Up'}
                      </button>
                    )}
                    {delivery.status !== 'delivered' && (
                      <button
                        onClick={() => updateStatus(delivery.id, 'delivered')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {deliveries.length === 0 && (
            <div className="p-12 text-center">
              <Package size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-brand-secondary">No deliveries assigned for today.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 p-6 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <Navigation size={24} className="text-purple-600" />
            <span className="font-semibold text-brand-primary">Start Route</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Phone size={24} className="text-blue-600" />
            <span className="font-semibold text-brand-primary">Call Dispatch</span>
          </button>
        </div>
      </div>
    </div>
  );
}
