'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Thermometer,
  ThermometerSnowflake,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  Download,
} from 'lucide-react';

export default function TemperaturePage() {
  // Mock temperature data
  const temperatureData = [
    {
      location: 'Cold Room A',
      warehouse: 'Cold Storage Facility',
      zone: 'Seafood Storage',
      current_temp: 2.5,
      target_temp: 3.0,
      humidity: 85,
      status: 'normal',
      last_reading: '2 min ago',
    },
    {
      location: 'Freezer Unit 1',
      warehouse: 'Cold Storage Facility',
      zone: 'Long-term Storage',
      current_temp: -18.0,
      target_temp: -18.0,
      humidity: 75,
      status: 'normal',
      last_reading: '2 min ago',
    },
    {
      location: 'Cold Room B',
      warehouse: 'Cold Storage Facility',
      zone: 'Fresh Produce',
      current_temp: 8.2,
      target_temp: 5.0,
      humidity: 90,
      status: 'alert',
      last_reading: '1 min ago',
    },
    {
      location: 'Freezer Unit 2',
      warehouse: 'Main Central Warehouse',
      zone: 'Export Staging',
      current_temp: -15.8,
      target_temp: -18.0,
      humidity: 70,
      status: 'warning',
      last_reading: '3 min ago',
    },
    {
      location: 'Chiller Zone 1',
      warehouse: 'Processing Intake Store',
      zone: 'Intake Area',
      current_temp: 4.5,
      target_temp: 4.0,
      humidity: 80,
      status: 'normal',
      last_reading: '1 min ago',
    },
  ];

  const recentLogs = [
    {
      log_date: '2025-03-15',
      log_time: '14:30',
      location: 'Cold Room A',
      temperature: 2.8,
      humidity: 85,
      status: 'normal',
      recorded_by: 'System Auto',
    },
    {
      log_date: '2025-03-15',
      log_time: '14:25',
      location: 'Freezer Unit 1',
      temperature: -18.2,
      humidity: 75,
      status: 'normal',
      recorded_by: 'System Auto',
    },
    {
      log_date: '2025-03-15',
      log_time: '14:20',
      location: 'Cold Room B',
      temperature: 8.5,
      humidity: 92,
      status: 'alert',
      recorded_by: 'John Kila',
    },
    {
      log_date: '2025-03-15',
      log_time: '14:15',
      location: 'Freezer Unit 2',
      temperature: -15.5,
      humidity: 68,
      status: 'warning',
      recorded_by: 'System Auto',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Normal</Badge>;
      case 'warning':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'alert':
        return <Badge variant="destructive">Alert</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTempColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'alert':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const normalCount = temperatureData.filter((t) => t.status === 'normal').length;
  const warningCount = temperatureData.filter((t) => t.status === 'warning').length;
  const alertCount = temperatureData.filter((t) => t.status === 'alert').length;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Temperature Monitoring</h1>
            <p className="mt-1 text-sm text-gray-500">
              Real-time cold chain monitoring and compliance
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export Logs
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Log Reading
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-6 p-8">
        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Monitored Zones
              </CardTitle>
              <ThermometerSnowflake className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{temperatureData.length}</div>
              <p className="mt-1 text-xs text-gray-500">active monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Normal Status
              </CardTitle>
              <ThermometerSnowflake className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{normalCount}</div>
              <p className="mt-1 text-xs text-gray-500">within target range</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Warnings
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{warningCount}</div>
              <p className="mt-1 text-xs text-gray-500">requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Critical Alerts
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{alertCount}</div>
              <p className="mt-1 text-xs text-gray-500">immediate action needed</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Temperature Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-blue-600" />
              Live Temperature Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {temperatureData.map((zone, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg border p-4 ${
                    zone.status === 'alert'
                      ? 'border-red-200 bg-red-50'
                      : zone.status === 'warning'
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{zone.location}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{zone.warehouse}</p>
                      <p className="text-xs text-gray-500">{zone.zone}</p>
                    </div>
                    {getStatusBadge(zone.status)}
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Temperature</span>
                      <div className="text-right">
                        <span className={`text-2xl font-bold ${getTempColor(zone.status)}`}>
                          {zone.current_temp}°C
                        </span>
                        <p className="text-xs text-gray-500">Target: {zone.target_temp}°C</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Humidity</span>
                      <span className="text-sm font-medium text-gray-900">{zone.humidity}%</span>
                    </div>

                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="text-xs text-gray-500">Last reading</span>
                      <span className="text-xs text-gray-600">{zone.last_reading}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Temperature Trends */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Temperature Trends (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {temperatureData.slice(0, 3).map((zone, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{zone.location}</span>
                      <span className={`font-medium ${getTempColor(zone.status)}`}>
                        {zone.current_temp}°C
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full ${
                          zone.status === 'alert'
                            ? 'bg-red-500'
                            : zone.status === 'warning'
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                        }`}
                        style={{
                          width: `${Math.min(100, Math.max(0, ((zone.current_temp - zone.target_temp + 5) / 10) * 100))}%`,
                        }}
                      />
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
                Humidity Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {temperatureData.slice(0, 3).map((zone, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{zone.location}</span>
                      <span className="font-medium text-gray-900">{zone.humidity}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${zone.humidity}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Logs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Temperature Logs</CardTitle>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Temperature
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Humidity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recorded By
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {recentLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {log.log_date} {log.log_time}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{log.location}</td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-medium ${getTempColor(log.status)}`}>
                          {log.temperature}°C
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{log.humidity}%</td>
                      <td className="px-4 py-4">{getStatusBadge(log.status)}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{log.recorded_by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900">
              <AlertTriangle className="h-5 w-5" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-white p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Cold Room B - Temperature above threshold
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Current: 8.2°C | Target: 5.0°C | Variance: +3.2°C
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className="rounded px-3 py-1 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700">
                      Investigate
                    </button>
                    <button className="rounded px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300">
                      Create Alert
                    </button>
                  </div>
                </div>
                <span className="text-xs text-gray-500">5 min ago</span>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-white p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Freezer Unit 2 - Temperature below target
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Current: -15.8°C | Target: -18.0°C | Variance: +2.2°C
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className="rounded px-3 py-1 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700">
                      Review
                    </button>
                    <button className="rounded px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300">
                      Dismiss
                    </button>
                  </div>
                </div>
                <span className="text-xs text-gray-500">12 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
