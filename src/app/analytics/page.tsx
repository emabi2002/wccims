'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Package,
  Warehouse,
  AlertTriangle,
  Download,
  Calendar,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Reporting</h1>
            <p className="mt-1 text-sm text-gray-500">
              Inventory insights, trends, and performance metrics
            </p>
          </div>
          <div className="flex gap-2">
            <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>This Year</option>
            </select>
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-6 p-8">
        {/* Key Performance Indicators */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Inventory Turnover
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">4.2x</div>
              <p className="mt-1 flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Stock Accuracy
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">96.5%</div>
              <p className="mt-1 flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Warehouse Efficiency
              </CardTitle>
              <Warehouse className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">89%</div>
              <p className="mt-1 flex items-center text-xs text-red-600">
                <TrendingDown className="mr-1 h-3 w-3" />
                -3% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Spoilage Rate
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">1.8%</div>
              <p className="mt-1 flex items-center text-xs text-green-600">
                <TrendingDown className="mr-1 h-3 w-3" />
                -0.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inventory">Inventory Analysis</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="quality">Quality & Compliance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Stock Value by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Stock Value by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: 'Seafood', value: 125000, percentage: 35, color: 'bg-blue-500' },
                      { category: 'Cocoa', value: 98000, percentage: 28, color: 'bg-amber-500' },
                      { category: 'Feed', value: 72000, percentage: 20, color: 'bg-green-500' },
                      { category: 'Fertilizer', value: 35000, percentage: 10, color: 'bg-purple-500' },
                      { category: 'Others', value: 25000, percentage: 7, color: 'bg-gray-400' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">{item.category}</span>
                          <span className="font-semibold text-gray-900">
                            PGK {item.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-10">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Moving Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Moving Items (30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { item: 'Fish Feed Pellets', movement: 2450, unit: 'kg', trend: 'up' },
                      { item: 'Cocoa Beans Premium', movement: 1850, unit: 'kg', trend: 'up' },
                      { item: 'Barramundi Fresh', movement: 920, unit: 'kg', trend: 'down' },
                      { item: 'NPK Fertilizer', movement: 780, unit: 'kg', trend: 'up' },
                      { item: 'Packaging Materials', movement: 650, unit: 'units', trend: 'up' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.item}</p>
                          <p className="text-xs text-gray-500">
                            {item.movement.toLocaleString()} {item.unit} moved
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <Badge variant="outline">#{idx + 1}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stock Aging Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Stock Aging Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    { period: '0-30 days', count: 156, value: 245000, color: 'bg-green-500' },
                    { period: '31-60 days', count: 48, value: 87000, color: 'bg-blue-500' },
                    { period: '61-90 days', count: 22, value: 34000, color: 'bg-yellow-500' },
                    { period: '90+ days', count: 8, value: 12000, color: 'bg-red-500' },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-lg border p-4">
                      <p className="text-xs text-gray-500">{item.period}</p>
                      <p className="mt-1 text-2xl font-bold text-gray-900">{item.count}</p>
                      <p className="text-sm text-gray-600">
                        PGK {item.value.toLocaleString()}
                      </p>
                      <div className={`mt-2 h-1.5 rounded-full ${item.color}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Receipt Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Receipt Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Receipts (30d)</span>
                      <span className="text-lg font-semibold text-gray-900">142</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg. Processing Time</span>
                      <span className="text-lg font-semibold text-gray-900">2.4 hrs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">On-time Receipts</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-green-600">94%</span>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Discrepancies</span>
                      <span className="text-lg font-semibold text-gray-900">3.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Issue Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Issue Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Issues (30d)</span>
                      <span className="text-lg font-semibold text-gray-900">198</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg. Fulfillment Time</span>
                      <span className="text-lg font-semibold text-gray-900">1.8 hrs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Fill Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-green-600">97%</span>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Backorders</span>
                      <span className="text-lg font-semibold text-gray-900">2.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Warehouse Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Warehouse Activity by Facility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { warehouse: 'Main Central Warehouse', receipts: 56, issues: 84, transfers: 22 },
                    { warehouse: 'Cold Storage Facility', receipts: 38, issues: 45, transfers: 12 },
                    { warehouse: 'Feed Store East', receipts: 32, issues: 48, transfers: 8 },
                    { warehouse: 'Freezer Unit Alpha', receipts: 16, issues: 21, transfers: 5 },
                  ].map((wh, idx) => (
                    <div key={idx} className="rounded-lg border p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{wh.warehouse}</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-gray-500">Receipts</p>
                          <p className="text-lg font-semibold text-blue-600">{wh.receipts}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Issues</p>
                          <p className="text-lg font-semibold text-green-600">{wh.issues}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Transfers</p>
                          <p className="text-lg font-semibold text-purple-600">{wh.transfers}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Quality Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Inspection Pass Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-green-600">98.2%</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Excellent</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rejection Rate</span>
                      <span className="text-lg font-semibold text-gray-900">1.8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Spoilage Rate</span>
                      <span className="text-lg font-semibold text-yellow-600">1.8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cold Chain Compliance</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-green-600">99.1%</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Compliant</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Spoilage Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Spoilage Analysis (30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { cause: 'Temperature Failure', count: 5, value: 8500 },
                      { cause: 'Expiry', count: 4, value: 3200 },
                      { cause: 'Damage', count: 3, value: 2100 },
                      { cause: 'Contamination', count: 2, value: 1800 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.cause}</p>
                          <p className="text-xs text-gray-500">{item.count} incidents</p>
                        </div>
                        <span className="text-sm font-semibold text-red-600">
                          PGK {item.value.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Expiry Status */}
            <Card>
              <CardHeader>
                <CardTitle>Expiry Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    { period: 'Expired', count: 0, color: 'text-red-600', bg: 'bg-red-50' },
                    { period: '0-7 days', count: 3, color: 'text-red-600', bg: 'bg-red-50' },
                    { period: '8-30 days', count: 12, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                    { period: '30+ days', count: 219, color: 'text-green-600', bg: 'bg-green-50' },
                  ].map((item, idx) => (
                    <div key={idx} className={`rounded-lg border p-4 ${item.bg}`}>
                      <p className="text-xs text-gray-600">{item.period}</p>
                      <p className={`mt-1 text-3xl font-bold ${item.color}`}>{item.count}</p>
                      <p className="text-xs text-gray-500 mt-1">items</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stock Movement Trends (12 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <p className="text-sm text-gray-600">Total Receipts</p>
                      <p className="text-2xl font-bold text-blue-600">1,847</p>
                      <p className="text-xs text-gray-500 mt-1">+18% vs last year</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="text-sm text-gray-600">Total Issues</p>
                      <p className="text-2xl font-bold text-green-600">2,156</p>
                      <p className="text-xs text-gray-500 mt-1">+12% vs last year</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="text-sm text-gray-600">Net Change</p>
                      <p className="text-2xl font-bold text-gray-900">-309</p>
                      <p className="text-xs text-gray-500 mt-1">healthy turnover</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Category Growth Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { category: 'Seafood', growth: 24, trend: 'up' },
                      { category: 'Feed', growth: 18, trend: 'up' },
                      { category: 'Cocoa', growth: 12, trend: 'up' },
                      { category: 'Fresh Produce', growth: -5, trend: 'down' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.growth > 0 ? '+' : ''}{item.growth}%
                          </span>
                          {item.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <p className="text-sm font-medium text-blue-900">Peak Season: Mar-Jun</p>
                      <p className="text-xs text-blue-700 mt-1">Cocoa harvest drives 45% increase</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3">
                      <p className="text-sm font-medium text-green-900">High Activity: Jul-Sep</p>
                      <p className="text-xs text-green-700 mt-1">Aquaculture peak production</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-sm font-medium text-gray-900">Low Season: Oct-Feb</p>
                      <p className="text-xs text-gray-700 mt-1">Planning and maintenance period</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
