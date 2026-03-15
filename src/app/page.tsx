'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Warehouse,
  Package,
  AlertTriangle,
  TrendingUp,
  ThermometerSnowflake,
  TrendingDown,
  FileText,
  Truck,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Warehouse, Cold Chain & Inventory Management System
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-6 p-8">
        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Warehouses
              </CardTitle>
              <Warehouse className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">12</div>
              <p className="mt-1 text-xs text-gray-500">
                <span className="text-green-600">+2</span> since last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Stock Items
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">2,847</div>
              <p className="mt-1 text-xs text-gray-500">
                <span className="text-green-600">+12%</span> inventory growth
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Cold Chain Alerts
              </CardTitle>
              <ThermometerSnowflake className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">3</div>
              <p className="mt-1 text-xs text-gray-500">
                <span className="text-red-600">Requires attention</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Near Expiry Items
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">15</div>
              <p className="mt-1 text-xs text-gray-500">
                Within 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Different Views */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="cold-chain">Cold Chain</TabsTrigger>
            <TabsTrigger value="quality">Quality Control</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Stock Movement Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Stock Movement Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-600">Receipts Today</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-600">Issues Pending</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                      <span className="text-sm text-gray-600">Transfers Active</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      <span className="text-sm text-gray-600">Dispatch Staging</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">6</span>
                  </div>
                </CardContent>
              </Card>

              {/* Warehouse Utilization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Warehouse className="h-5 w-5 text-blue-600" />
                    Warehouse Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Main Central Warehouse</span>
                      <span className="font-medium text-gray-900">78%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-[78%] bg-green-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Cold Storage Facility</span>
                      <span className="font-medium text-gray-900">92%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-[92%] bg-yellow-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Freezer Unit Alpha</span>
                      <span className="font-medium text-gray-900">65%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-[65%] bg-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: 'Goods Receipt',
                      description: 'Cocoa Beans Premium - 500 kg received',
                      warehouse: 'Main Central Warehouse',
                      time: '2 hours ago',
                      status: 'completed',
                    },
                    {
                      action: 'Stock Transfer',
                      description: 'Fish Feed Pellets - 200 kg transferred',
                      warehouse: 'Feed Store → Processing Intake',
                      time: '3 hours ago',
                      status: 'completed',
                    },
                    {
                      action: 'Temperature Alert',
                      description: 'Cold Room temperature spike detected',
                      warehouse: 'Cold Storage Facility',
                      time: '5 hours ago',
                      status: 'alert',
                    },
                    {
                      action: 'Issue Request',
                      description: 'Processing requested packaging materials',
                      warehouse: 'Main Central Warehouse',
                      time: '6 hours ago',
                      status: 'pending',
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <Badge
                            variant={
                              activity.status === 'completed'
                                ? 'default'
                                : activity.status === 'alert'
                                  ? 'destructive'
                                  : 'outline'
                            }
                          >
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{activity.description}</p>
                        <p className="mt-1 text-xs text-gray-500">{activity.warehouse}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Pending Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Stock Counts Due</span>
                    <Badge>5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Approvals Required</span>
                    <Badge variant="destructive">8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Transfers to Receive</span>
                    <Badge>3</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    Dispatch Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ready to Load</span>
                    <Badge>6</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">In Staging</span>
                    <Badge variant="outline">4</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completed Today</span>
                    <Badge>12</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-blue-600" />
                    Low Stock Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Below Reorder Level</span>
                    <Badge variant="destructive">7</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Critical Items</span>
                    <Badge variant="destructive">2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reserved Stock</span>
                    <Badge>15</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cold-chain" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThermometerSnowflake className="h-5 w-5 text-blue-600" />
                    Temperature Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Cold Room A</p>
                      <p className="text-xs text-gray-500">Zone: Seafood Storage</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">2.5°C</p>
                      <p className="text-xs text-green-600">Normal</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Freezer Unit 1</p>
                      <p className="text-xs text-gray-500">Zone: Long-term Storage</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">-18°C</p>
                      <p className="text-xs text-green-600">Normal</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Cold Room B</p>
                      <p className="text-xs text-gray-500">Zone: Fresh Produce</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">8.2°C</p>
                      <p className="text-xs text-red-600">High Alert</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      type: 'Over Temperature',
                      location: 'Cold Room B',
                      severity: 'high',
                      time: '5 min ago',
                    },
                    {
                      type: 'Door Open Too Long',
                      location: 'Freezer Unit 2',
                      severity: 'medium',
                      time: '2 hours ago',
                    },
                    {
                      type: 'Power Failure',
                      location: 'Cold Room C',
                      severity: 'high',
                      time: '1 day ago',
                      resolved: true,
                    },
                  ].map((alert, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-3 ${alert.resolved ? 'bg-gray-50' : alert.severity === 'high' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                          <p className="text-xs text-gray-500">{alert.location}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              alert.resolved
                                ? 'outline'
                                : alert.severity === 'high'
                                  ? 'destructive'
                                  : 'default'
                            }
                          >
                            {alert.resolved ? 'Resolved' : alert.severity}
                          </Badge>
                          <p className="mt-1 text-xs text-gray-400">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                    Expiry Watch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { item: 'Lettuce Fresh', batch: 'BTH-2024-001', days: 2, qty: '15 kg' },
                      { item: 'Barramundi Fresh', batch: 'BTH-2024-002', days: 5, qty: '45 kg' },
                      { item: 'Feed Pellets Premium', batch: 'BTH-2024-003', days: 12, qty: '200 kg' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.item}</p>
                          <p className="text-xs text-gray-500">Batch: {item.batch}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={item.days <= 3 ? 'destructive' : item.days <= 7 ? 'default' : 'outline'}>
                            {item.days}d left
                          </Badge>
                          <p className="mt-1 text-xs text-gray-500">{item.qty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-blue-600" />
                    Spoilage Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-2xl font-bold text-gray-900">12 items</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Temperature Failure</span>
                      <span className="font-medium text-gray-900">5</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Expiry</span>
                      <span className="font-medium text-gray-900">4</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Damage</span>
                      <span className="font-medium text-gray-900">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <button className="flex flex-col items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 transition-colors hover:bg-blue-100">
                <Truck className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">New Receipt</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 transition-colors hover:bg-green-100">
                <FileText className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium text-green-900">Issue Stock</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 p-4 transition-colors hover:bg-purple-100">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Transfer Stock</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 p-4 transition-colors hover:bg-orange-100">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Stock Count</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
