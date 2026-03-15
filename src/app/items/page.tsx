'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Search, Filter } from 'lucide-react';

export default function ItemsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data
  const items = [
    {
      item_id: '1',
      item_code: 'COCOA-001',
      item_name: 'Cocoa Beans Premium',
      item_category: 'Cocoa',
      unit_of_measure: 'kg',
      storage_requirement: 'Dry Protected',
      shelf_life_days: 180,
      reorder_level: 500,
      reorder_quantity: 1000,
      traceability_required: true,
      current_stock: 1250,
      status: 'active',
    },
    {
      item_id: '2',
      item_code: 'FISH-001',
      item_name: 'Barramundi Fresh',
      item_category: 'Seafood',
      unit_of_measure: 'kg',
      storage_requirement: 'Chilled',
      shelf_life_days: 7,
      reorder_level: 100,
      reorder_quantity: 200,
      traceability_required: true,
      current_stock: 145,
      status: 'active',
    },
    {
      item_id: '3',
      item_code: 'FEED-001',
      item_name: 'Fish Feed Pellets',
      item_category: 'Feed',
      unit_of_measure: 'kg',
      storage_requirement: 'Dry Protected',
      shelf_life_days: 90,
      reorder_level: 1000,
      reorder_quantity: 2000,
      traceability_required: false,
      current_stock: 3200,
      status: 'active',
    },
    {
      item_id: '4',
      item_code: 'VEG-001',
      item_name: 'Lettuce Fresh',
      item_category: 'Fresh Produce',
      unit_of_measure: 'kg',
      storage_requirement: 'Chilled',
      shelf_life_days: 14,
      reorder_level: 50,
      reorder_quantity: 100,
      traceability_required: true,
      current_stock: 25,
      status: 'active',
    },
    {
      item_id: '5',
      item_code: 'PKG-001',
      item_name: 'Cardboard Boxes 50x40x30',
      item_category: 'Packaging',
      unit_of_measure: 'units',
      storage_requirement: 'Dry Protected',
      shelf_life_days: null,
      reorder_level: 200,
      reorder_quantity: 500,
      traceability_required: false,
      current_stock: 450,
      status: 'active',
    },
    {
      item_id: '6',
      item_code: 'FERT-001',
      item_name: 'NPK Fertilizer 15-15-15',
      item_category: 'Fertilizer',
      unit_of_measure: 'kg',
      storage_requirement: 'Dry Protected',
      shelf_life_days: 365,
      reorder_level: 500,
      reorder_quantity: 1000,
      traceability_required: false,
      current_stock: 650,
      status: 'active',
    },
  ];

  const categories = [
    'All Categories',
    'Cocoa',
    'Seafood',
    'Fresh Produce',
    'Feed',
    'Fertilizer',
    'Chemicals',
    'Packaging',
    'Spare Parts',
    'Tools',
    'Medical Supplies',
    'General Consumables',
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'All Categories' ||
      item.item_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (current: number, reorder: number) => {
    if (current <= reorder * 0.5) return { label: 'Critical', color: 'destructive' as const };
    if (current <= reorder) return { label: 'Low', color: 'default' as const };
    return { label: 'OK', color: 'outline' as const };
  };

  const getStorageIcon = (requirement: string) => {
    const colors: Record<string, string> = {
      Chilled: 'bg-blue-100 text-blue-700',
      Frozen: 'bg-cyan-100 text-cyan-700',
      'Dry Protected': 'bg-amber-100 text-amber-700',
      Ambient: 'bg-gray-100 text-gray-700',
      Hazardous: 'bg-red-100 text-red-700',
    };
    return colors[requirement] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Item Master Catalog</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage inventory items and their attributes
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            New Item
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
                Total Items
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{items.length}</div>
              <p className="mt-1 text-xs text-gray-500">active items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Low Stock Items
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {items.filter((i) => i.current_stock <= i.reorder_level).length}
              </div>
              <p className="mt-1 text-xs text-gray-500">need reordering</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Traceable Items
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {items.filter((i) => i.traceability_required).length}
              </div>
              <p className="mt-1 text-xs text-gray-500">require batch tracking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Cold Storage Items
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {items.filter((i) => i.storage_requirement === 'Chilled' || i.storage_requirement === 'Frozen').length}
              </div>
              <p className="mt-1 text-xs text-gray-500">temperature controlled</p>
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
                  placeholder="Search items by name or code..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
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
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Storage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reorder Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredItems.map((item) => {
                    const stockStatus = getStockStatus(item.current_stock, item.reorder_level);
                    return (
                      <tr key={item.item_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                              <Package className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.item_name}</p>
                              <p className="text-sm text-gray-500">{item.item_code}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline">{item.item_category}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStorageIcon(item.storage_requirement)}`}>
                            {item.storage_requirement}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.current_stock.toLocaleString()} {item.unit_of_measure}
                            </p>
                            {item.shelf_life_days && (
                              <p className="text-xs text-gray-500">Shelf life: {item.shelf_life_days}d</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">
                            {item.reorder_level.toLocaleString()} {item.unit_of_measure}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={stockStatus.color}>{stockStatus.label}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-gray-300" />
                <p className="mt-4 text-sm font-medium text-gray-900">No items found</p>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
