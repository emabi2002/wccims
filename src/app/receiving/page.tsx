'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Plus, Search, Filter, Package, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function ReceivingPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock goods receipts
  const receipts = [
    {
      receipt_number: 'GR-2024-0156',
      receipt_date: '2025-03-15',
      source_type: 'Farm Harvest',
      source_location: 'Kikori Farm Site A',
      warehouse_name: 'Main Central Warehouse',
      received_by: 'John Kila',
      inspection_status: 'completed',
      status: 'completed',
      items_count: 3,
      total_quantity: 850,
    },
    {
      receipt_number: 'GR-2024-0155',
      receipt_date: '2025-03-15',
      source_type: 'Supplier Delivery',
      source_location: 'PNG Feeds Limited',
      warehouse_name: 'Feed Store East',
      received_by: 'Maria Toka',
      inspection_status: 'in_progress',
      status: 'pending',
      items_count: 2,
      total_quantity: 2000,
    },
    {
      receipt_number: 'GR-2024-0154',
      receipt_date: '2025-03-14',
      source_type: 'Aquaculture Harvest',
      source_location: 'Baimuru Hatchery',
      warehouse_name: 'Cold Storage Facility',
      received_by: 'Sarah Bona',
      inspection_status: 'completed',
      status: 'completed',
      items_count: 1,
      total_quantity: 145,
    },
    {
      receipt_number: 'GR-2024-0153',
      receipt_date: '2025-03-14',
      source_type: 'Inter-Warehouse Transfer',
      source_location: 'Secondary Warehouse B',
      warehouse_name: 'Main Central Warehouse',
      received_by: 'Peter Mase',
      inspection_status: 'pending',
      status: 'draft',
      items_count: 4,
      total_quantity: 650,
    },
  ];

  const recentItems = [
    {
      item_name: 'Cocoa Beans Premium',
      batch_number: 'BTH-2024-001',
      quantity: 500,
      unit: 'kg',
      quality_grade: 'Grade A',
      temperature: 25.5,
      receipt_number: 'GR-2024-0156',
    },
    {
      item_name: 'Barramundi Fresh',
      batch_number: 'BTH-2024-010',
      quantity: 145,
      unit: 'kg',
      quality_grade: 'Premium',
      temperature: 3.2,
      receipt_number: 'GR-2024-0154',
    },
    {
      item_name: 'Fish Feed Pellets',
      batch_number: 'BTH-2024-015',
      quantity: 2000,
      unit: 'kg',
      quality_grade: 'Standard',
      temperature: 22.0,
      receipt_number: 'GR-2024-0155',
    },
  ];

  const filteredReceipts = receipts.filter(
    (r) =>
      r.receipt_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.source_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInspectionIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goods Receiving</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage incoming stock and warehouse intake operations
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            New Receipt
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-6 p-8">
        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Today's Receipts
              </CardTitle>
              <Truck className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {receipts.filter(r => r.receipt_date === '2025-03-15').length}
              </div>
              <p className="mt-1 text-xs text-gray-500">incoming deliveries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Inspection
              </CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {receipts.filter(r => r.inspection_status === 'pending' || r.inspection_status === 'in_progress').length}
              </div>
              <p className="mt-1 text-xs text-gray-500">awaiting quality check</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Completed
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {receipts.filter(r => r.status === 'completed').length}
              </div>
              <p className="mt-1 text-xs text-gray-500">this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Items Received
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {receipts.reduce((sum, r) => sum + r.items_count, 0)}
              </div>
              <p className="mt-1 text-xs text-gray-500">SKUs processed</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by receipt number or source..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">All Sources</option>
                <option value="Farm Harvest">Farm Harvest</option>
                <option value="Aquaculture Harvest">Aquaculture Harvest</option>
                <option value="Supplier Delivery">Supplier Delivery</option>
                <option value="Inter-Warehouse Transfer">Inter-Warehouse Transfer</option>
              </select>
              <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                More Filters
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Receipt List */}
        <div className="grid gap-6">
          {filteredReceipts.map((receipt) => (
            <Card key={receipt.receipt_number} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {receipt.receipt_number}
                        </h3>
                        {getStatusBadge(receipt.status)}
                      </div>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Source:</span> {receipt.source_type} • {receipt.source_location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Warehouse:</span> {receipt.warehouse_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Received by:</span> {receipt.received_by} • {receipt.receipt_date}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getInspectionIcon(receipt.inspection_status)}
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Inspection</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {receipt.inspection_status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Items</p>
                    <p className="text-lg font-semibold text-gray-900">{receipt.items_count}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Quantity</p>
                    <p className="text-lg font-semibold text-gray-900">{receipt.total_quantity.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 items-end justify-end">
                    <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      View Details
                    </button>
                    {receipt.status !== 'completed' && (
                      <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                        Process
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Items Received */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Recent Items Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Item
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Batch Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quality Grade
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Temp on Arrival
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {item.item_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {item.batch_number}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.quantity.toLocaleString()} {item.unit}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{item.quality_grade}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.temperature}°C
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-600">
                        {item.receipt_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
