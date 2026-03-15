'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Warehouse,
  Package,
  ClipboardList,
  GitBranch,
  FileText,
  TrendingUp,
  Thermometer,
  ListChecks,
  AlertTriangle,
  Truck,
  LayoutDashboard,
  MapPin,
  QrCode,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
      },
      {
        title: 'Analytics',
        href: '/analytics',
        icon: TrendingUp,
      },
    ],
  },
  {
    title: 'Facility Management',
    items: [
      {
        title: 'Warehouses',
        href: '/warehouses',
        icon: Warehouse,
      },
      {
        title: 'Storage Locations',
        href: '/locations',
        icon: MapPin,
      },
    ],
  },
  {
    title: 'Inventory',
    items: [
      {
        title: 'Item Master',
        href: '/items',
        icon: Package,
      },
      {
        title: 'Stock Balance',
        href: '/stock-balance',
        icon: ClipboardList,
      },
      {
        title: 'Batch Traceability',
        href: '/traceability',
        icon: QrCode,
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        title: 'Goods Receiving',
        href: '/receiving',
        icon: Truck,
      },
      {
        title: 'Stock Movements',
        href: '/movements',
        icon: GitBranch,
      },
      {
        title: 'Warehouse Transfers',
        href: '/transfers',
        icon: FileText,
      },
      {
        title: 'Issue Requests',
        href: '/issues',
        icon: FileText,
      },
      {
        title: 'Dispatch Staging',
        href: '/dispatch',
        icon: Truck,
      },
    ],
  },
  {
    title: 'Cold Chain',
    items: [
      {
        title: 'Temperature Monitoring',
        href: '/temperature',
        icon: Thermometer,
      },
      {
        title: 'Cold Chain Alerts',
        href: '/alerts',
        icon: AlertTriangle,
      },
    ],
  },
  {
    title: 'Control',
    items: [
      {
        title: 'Stock Counts',
        href: '/stock-counts',
        icon: ListChecks,
      },
      {
        title: 'Adjustments',
        href: '/adjustments',
        icon: FileText,
      },
      {
        title: 'Expiry Management',
        href: '/expiry',
        icon: AlertTriangle,
      },
      {
        title: 'Spoilage Records',
        href: '/spoilage',
        icon: AlertTriangle,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
            <Warehouse className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">WCCIMS</h1>
            <p className="text-xs text-gray-500">Warehouse & Inventory</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Info */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
            U
          </div>
          <div className="flex-1 text-sm">
            <p className="font-medium text-gray-900">User</p>
            <p className="text-xs text-gray-500">Warehouse Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
