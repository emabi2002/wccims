'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Warehouse, MapPin, Phone, User, Plus, Search } from 'lucide-react';

export default function WarehousesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - will be replaced with Supabase queries
  const warehouses = [
    {
      warehouse_id: '1',
      warehouse_name: 'Main Central Warehouse',
      warehouse_code: 'WH-001',
      facility_type: 'Main Warehouse',
      province: 'Gulf',
      district: 'Kikori',
      manager_name: 'John Kila',
      phone: '+675 123 4567',
      capacity_m3: 5000,
      current_utilization: 78,
      status: 'active',
    },
    {
      warehouse_id: '2',
      warehouse_name: 'Cold Storage Facility',
      warehouse_code: 'WH-002',
      facility_type: 'Cold Room',
      province: 'Gulf',
      district: 'Kikori',
      manager_name: 'Sarah Bona',
      phone: '+675 123 4568',
      capacity_m3: 1500,
      current_utilization: 92,
      status: 'active',
    },
    {
      warehouse_id: '3',
      warehouse_name: 'Freezer Unit Alpha',
      warehouse_code: 'WH-003',
      facility_type: 'Freezer Room',
      province: 'Gulf',
      district: 'Kikori',
      manager_name: 'Peter Mase',
      phone: '+675 123 4569',
      capacity_m3: 800,
      current_utilization: 65,
      status: 'active',
    },
    {
      warehouse_id: '4',
      warehouse_name: 'Feed Store East',
      warehouse_code: 'WH-004',
      facility_type: 'Feed Store',
      province: 'Gulf',
      district: 'Baimuru',
      manager_name: 'Maria Toka',
      phone: '+675 123 4570',
      capacity_m3: 2000,
      current_utilization: 54,
      status: 'active',
    },
  ];

  const filteredWarehouses = warehouses.filter(
    (wh) =>
      wh.warehouse_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wh.warehouse_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wh.facility_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600 bg-red-100';
    if (utilization >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Warehouse Registry</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage all storage facilities and warehouses
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            New Warehouse
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
                Total Facilities
              </CardTitle>
              <Warehouse className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{warehouses.length}</div>
              <p className="mt-1 text-xs text-gray-500">
                <span className="text-green-600">{warehouses.filter(w => w.status === 'active').length}</span> active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Capacity
              </CardTitle>
              <Warehouse className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {warehouses.reduce((sum, w) => sum + w.capacity_m3, 0).toLocaleString()}
              </div>
              <p className="mt-1 text-xs text-gray-500">cubic meters</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg. Utilization
              </CardTitle>
              <Warehouse className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {Math.round(warehouses.reduce((sum, w) => sum + w.current_utilization, 0) / warehouses.length)}%
              </div>
              <p className="mt-1 text-xs text-gray-500">across all facilities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                High Utilization
              </CardTitle>
              <Warehouse className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {warehouses.filter(w => w.current_utilization >= 90).length}
              </div>
              <p className="mt-1 text-xs text-gray-500">facilities over 90%</p>
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
                  placeholder="Search warehouses by name, code, or type..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">All Types</option>
                <option value="Main Warehouse">Main Warehouse</option>
                <option value="Cold Room">Cold Room</option>
                <option value="Freezer Room">Freezer Room</option>
                <option value="Feed Store">Feed Store</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Warehouse List */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredWarehouses.map((warehouse) => (
            <Card key={warehouse.warehouse_id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                      <Warehouse className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{warehouse.warehouse_name}</CardTitle>
                      <p className="text-sm text-gray-500">{warehouse.warehouse_code}</p>
                    </div>
                  </div>
                  <Badge variant={warehouse.status === 'active' ? 'default' : 'outline'}>
                    {warehouse.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Facility Type</p>
                    <p className="text-sm font-medium text-gray-900">{warehouse.facility_type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Capacity</p>
                    <p className="text-sm font-medium text-gray-900">{warehouse.capacity_m3.toLocaleString()} m³</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Utilization</span>
                    <span className={`font-semibold rounded px-2 py-1 ${getUtilizationColor(warehouse.current_utilization)}`}>
                      {warehouse.current_utilization}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full ${warehouse.current_utilization >= 90 ? 'bg-red-500' : warehouse.current_utilization >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${warehouse.current_utilization}%` }}
                    />
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {warehouse.district}, {warehouse.province}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{warehouse.manager_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{warehouse.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    View Details
                  </button>
                  <button className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Manage
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWarehouses.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Warehouse className="h-12 w-12 text-gray-300" />
              <p className="mt-4 text-sm font-medium text-gray-900">No warehouses found</p>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
