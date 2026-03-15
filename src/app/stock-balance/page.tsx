'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Download, Search, Filter, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function StockBalancePage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock stock balance data
  const stockData = [
    {
      item_code: 'COCOA-001',
      item_name: 'Cocoa Beans Premium',
      item_category: 'Cocoa',
      batch_number: 'BTH-2024-001',
      warehouse_name: 'Main Central Warehouse',
      zone_name: 'Zone A',
      rack_code: 'R-01',
      bin_code: 'B-05',
      quantity: 1250,
      unit_of_measure: 'kg',
      expiry_date: '2025-06-15',
      quality_status: 'approved',
    },
    {
      item_code: 'FISH-001',
      item_name: 'Barramundi Fresh',
      item_category: 'Seafood',
      batch_number: 'BTH-2024-010',
      warehouse_name: 'Cold Storage Facility',
      zone_name: 'Cold Zone 1',
      rack_code: 'C-02',
      bin_code: 'B-12',
      quantity: 145,
      unit_of_measure: 'kg',
      expiry_date: '2025-03-25',
      quality_status: 'approved',
    },
    {
      item_code: 'FEED-001',
      item_name: 'Fish Feed Pellets',
      item_category: 'Feed',
      batch_number: 'BTH-2024-015',
      warehouse_name: 'Feed Store East',
      zone_name: 'Bulk Storage',
      rack_code: 'R-03',
      bin_code: 'B-08',
      quantity: 3200,
      unit_of_measure: 'kg',
      expiry_date: '2025-05-20',
      quality_status: 'approved',
    },
    {
      item_code: 'VEG-001',
      item_name: 'Lettuce Fresh',
      item_category: 'Fresh Produce',
      batch_number: 'BTH-2024-018',
      warehouse_name: 'Cold Storage Facility',
      zone_name: 'Fresh Zone',
      rack_code: 'C-01',
      bin_code: 'B-03',
      quantity: 25,
      unit_of_measure: 'kg',
      expiry_date: '2025-03-30',
      quality_status: 'approved',
    },
    {
      item_code: 'PKG-001',
      item_name: 'Cardboard Boxes 50x40x30',
      item_category: 'Packaging',
      batch_number: 'BTH-2024-005',
      warehouse_name: 'Main Central Warehouse',
      zone_name: 'Zone B',
      rack_code: 'R-05',
      bin_code: 'B-15',
      quantity: 450,
      unit_of_measure: 'units',
      expiry_date: null,
      quality_status: 'approved',
    },
  ];

  const filteredStock = stockData.filter(
    (item) =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batch_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = filteredStock.length;
  const totalQuantity = filteredStock.reduce((sum, item) => sum + item.quantity, 0);

  const getDaysToExpiry = (expiryDate: string | null) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getExpiryBadge = (expiryDate: string | null) => {
    const days = getDaysToExpiry(expiryDate);
    if (!days) return <Badge variant="outline">No Expiry</Badge>;
    if (days <= 7) return <Badge variant="destructive">{days}d left</Badge>;
    if (days <= 30) return <Badge variant="default">{days}d left</Badge>;
    return <Badge variant="outline">{days}d left</Badge>;
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Stock Balance</h1>
            <p className="mt-1 text-sm text-gray-500">
              Real-time inventory across all warehouses
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export Report
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
                Total SKUs
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalValue}</div>
              <p className="mt-1 text-xs text-gray-500">unique items in stock</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Stock Units
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalQuantity.toLocaleString()}</div>
              <p className="mt-1 text-xs text-gray-500">across all warehouses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Warehouses
              </CardTitle>
              <MapPin className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {new Set(stockData.map((s) => s.warehouse_name)).size}
              </div>
              <p className="mt-1 text-xs text-gray-500">active locations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Near Expiry
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {stockData.filter((s) => {
                  const days = getDaysToExpiry(s.expiry_date);
                  return days && days <= 30;
                }).length}
              </div>
              <p className="mt-1 text-xs text-gray-500">items within 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Tabs */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by item name, code, or batch number..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Stock</TabsTrigger>
            <TabsTrigger value="by-warehouse">By Warehouse</TabsTrigger>
            <TabsTrigger value="by-category">By Category</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Batch
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expiry
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredStock.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">{item.item_name}</p>
                              <p className="text-sm text-gray-500">{item.item_code}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900">{item.batch_number}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.warehouse_name}</p>
                              <p className="text-xs text-gray-500">
                                {item.zone_name} • {item.rack_code}-{item.bin_code}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900">
                              {item.quantity.toLocaleString()} {item.unit_of_measure}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            {getExpiryBadge(item.expiry_date)}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={item.quality_status === 'approved' ? 'default' : 'outline'}>
                              {item.quality_status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="by-warehouse">
            <div className="grid gap-6">
              {Array.from(new Set(stockData.map((s) => s.warehouse_name))).map((warehouse) => {
                const warehouseStock = stockData.filter((s) => s.warehouse_name === warehouse);
                const warehouseQty = warehouseStock.reduce((sum, s) => sum + s.quantity, 0);

                return (
                  <Card key={warehouse}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{warehouse}</CardTitle>
                        <Badge>{warehouseStock.length} items</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {warehouseStock.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-0">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.item_name}</p>
                              <p className="text-xs text-gray-500">
                                {item.zone_name} • {item.rack_code}-{item.bin_code}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                {item.quantity.toLocaleString()} {item.unit_of_measure}
                              </p>
                              <p className="text-xs text-gray-500">{item.batch_number}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="by-category">
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from(new Set(stockData.map((s) => s.item_category))).map((category) => {
                const categoryStock = stockData.filter((s) => s.item_category === category);
                const categoryQty = categoryStock.reduce((sum, s) => sum + s.quantity, 0);

                return (
                  <Card key={category}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{category}</CardTitle>
                        <Badge variant="outline">{categoryStock.length} items</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {categoryStock.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{item.item_name}</span>
                            <span className="font-medium text-gray-900">
                              {item.quantity.toLocaleString()} {item.unit_of_measure}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="expiring">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {stockData
                    .filter((s) => {
                      const days = getDaysToExpiry(s.expiry_date);
                      return days && days <= 30;
                    })
                    .sort((a, b) => {
                      const daysA = getDaysToExpiry(a.expiry_date) || 999;
                      const daysB = getDaysToExpiry(b.expiry_date) || 999;
                      return daysA - daysB;
                    })
                    .map((item, idx) => {
                      const days = getDaysToExpiry(item.expiry_date);
                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between rounded-lg border p-4 ${days && days <= 7 ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}`}
                        >
                          <div>
                            <p className="font-medium text-gray-900">{item.item_name}</p>
                            <p className="text-sm text-gray-600">
                              Batch: {item.batch_number} • {item.warehouse_name}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={days && days <= 7 ? 'destructive' : 'default'}>
                              {days}d left
                            </Badge>
                            <p className="mt-1 text-sm text-gray-600">
                              {item.quantity.toLocaleString()} {item.unit_of_measure}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                  {stockData.filter((s) => {
                    const days = getDaysToExpiry(s.expiry_date);
                    return days && days <= 30;
                  }).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Package className="h-12 w-12 text-gray-300" />
                      <p className="mt-4 text-sm font-medium text-gray-900">No items expiring soon</p>
                      <p className="mt-1 text-sm text-gray-500">All stock is within safe expiry periods</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
