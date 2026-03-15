# WCCIMS - Warehouse, Cold Chain and Inventory Management System

**Production-grade enterprise warehouse and inventory platform for the Kikori Basin integrated development initiative.**

## 🎯 Overview

WCCIMS is a comprehensive warehouse and inventory management system designed to manage all storage, stock movement, cold-chain preservation, batch tracking, and inventory control operations across multiple facilities.

### Key Features

- ✅ **12 Core Modules** - Complete warehouse management functionality
- ✅ **Multi-Warehouse Support** - Manage multiple facilities from one platform
- ✅ **Cold Chain Monitoring** - Real-time temperature tracking and alerts
- ✅ **Batch Traceability** - Full source-to-destination tracking
- ✅ **Role-Based Access Control** - 8 distinct user roles with granular permissions
- ✅ **Real-Time Analytics** - Comprehensive dashboards and reporting
- ✅ **Integration-Ready** - API endpoints for future system connections

## 📋 System Modules

### Overview
1. **Executive Dashboard** - KPIs, metrics, and system overview
2. **Analytics & Reporting** - Performance insights and trends

### Facility Management
3. **Warehouse Registry** - Manage all storage facilities
4. **Storage Locations** - Zone, bin, and rack management

### Inventory Management
5. **Item Master Catalog** - Standardized inventory items
6. **Stock Balance** - Real-time inventory across all warehouses
7. **Batch Traceability** - Track items from source to destination

### Operations
8. **Goods Receiving** - Manage incoming stock and intake operations
9. **Stock Movements** - Internal and inter-warehouse transfers
10. **Warehouse Transfers** - Facility-to-facility stock movement
11. **Issue Requests** - Stock allocation to departments
12. **Dispatch Staging** - Prepare inventory for transport

### Cold Chain Management
13. **Temperature Monitoring** - Real-time cold chain monitoring
14. **Cold Chain Alerts** - Temperature compliance and alerts

### Control & Compliance
15. **Stock Counts** - Physical inventory reconciliation
16. **Adjustments** - Inventory adjustments and corrections
17. **Expiry Management** - Monitor aging and expiring stock
18. **Spoilage Records** - Track and manage wastage

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with RBAC
- **Storage**: Supabase Storage for documents

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wccims
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   - Open your Supabase project SQL Editor
   - Run the schema from `.same/database-schema.sql`
   - This will create all tables, views, indexes, and RLS policies

5. **Configure Storage Buckets**

   Create the following buckets in Supabase Storage:
   - `warehouse_documents`
   - `stock_receipts`
   - `temperature_logs`
   - `inventory_adjustments`
   - `quality_certificates`
   - `dispatch_documents`

6. **Run the development server**
   ```bash
   bun run dev
   ```

7. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The system uses a comprehensive PostgreSQL schema with:

- **25+ Tables** covering all 12 modules
- **Custom ENUMs** for type safety
- **Materialized Views** for stock balance and analytics
- **Row Level Security** for data isolation
- **Indexes** for optimal performance
- **Triggers** for automated timestamp updates

See `.same/database-schema.sql` for the complete schema.

## 👥 User Roles

1. **System Administrator** - Full system access
2. **Warehouse Manager** - Facility oversight and approvals
3. **Inventory Controller** - Stock management
4. **Cold Chain Officer** - Temperature monitoring
5. **Receiving Clerk** - Goods intake operations
6. **Dispatch Clerk** - Outbound operations
7. **Quality Officer** - Quality control and compliance
8. **Hub Coordinator** - Site-specific access
9. **Executive Viewer** - Read-only dashboard access

## 🔌 API Endpoints (Ready for Integration)

The system is designed with API-first architecture, ready to integrate with:

- Agriculture and Aquaculture Production Management System
- Logistics, Fleet and Transport Management System
- Processing and Production Management System
- Export and Sales Management System
- Engineering and Asset Maintenance System
- Procurement and Supply Chain System
- Executive Dashboard and GIS Platform

Example endpoints structure:
```
/api/warehouses
/api/locations
/api/items
/api/receipts
/api/batches
/api/transfers
/api/issues
/api/temperature-logs
/api/stock-counts
/api/adjustments
/api/spoilage
/api/dispatch-prep
/api/analytics
```

## 📱 Mobile & Barcode Support

The system architecture is ready for future enhancements:

- Barcode/QR code scanning
- Handheld stock count devices
- Mobile receiving and dispatch apps
- IoT sensor integration for temperature monitoring
- Real-time alerts via SMS/email

## 🎨 Design Philosophy

WCCIMS follows enterprise ERP design principles:

- **Clean and Professional** - White panels, neutral backgrounds
- **Intuitive Navigation** - Left sidebar with organized modules
- **Data-Dense Tables** - Efficient information display
- **Status-Driven Colors** - Visual indicators for quick assessment
- **Responsive Design** - Works on desktop and tablet devices

## 📈 Key Performance Features

- **Real-Time Stock Balance** - Instant inventory visibility
- **Multi-Warehouse View** - Consolidated or facility-specific views
- **Batch Traceability** - Complete audit trail from source to use
- **Temperature Compliance** - Continuous cold chain monitoring
- **Expiry Management** - Proactive near-expiry alerts
- **Spoilage Tracking** - Loss analysis and prevention
- **Warehouse Utilization** - Capacity and efficiency metrics

## 🔐 Security

- Row Level Security (RLS) on all tables
- Role-based access control (RBAC)
- Secure authentication via Supabase Auth
- API key protection
- Data encryption at rest and in transit

## 📦 Deployment

### Netlify (Recommended)

1. **Build the project**
   ```bash
   bun run build
   ```

2. **Deploy**
   - Connect your GitHub repository to Netlify
   - Set environment variables in Netlify dashboard
   - Deploy automatically on push

### Alternative Deployment Options

- Vercel
- Railway
- Render
- Self-hosted with Docker

## 🧪 Testing

The system includes mock data for demonstration purposes. To connect to live data:

1. Update Supabase queries in page components
2. Replace mock data arrays with Supabase fetches
3. Implement real-time subscriptions for live updates

## 📝 Reports

The system supports exporting reports in:

- PDF
- Excel (CSV)
- JSON (for API integration)

Available reports:
- Stock balance report
- Inventory aging report
- Batch traceability report
- Goods receipt report
- Issue report
- Transfer report
- Variance report
- Spoilage and wastage report
- Expiry report
- Cold-chain temperature report
- Warehouse utilization report
- Dispatch staging report

## 🤝 Contributing

This is a production system for the Kikori Basin development initiative. For contributions or customizations, please contact the system administrator.

## 📄 License

Proprietary - Kikori Basin Integrated Development Initiative

## 🆘 Support

For support, please contact:
- Technical Support: support@same.new
- System Administrator: [Your contact information]

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Core warehouse management
- ✅ Cold chain monitoring
- ✅ Batch traceability
- ✅ Basic analytics

### Phase 2 (Planned)
- [ ] Barcode scanning integration
- [ ] Mobile applications
- [ ] IoT sensor integration
- [ ] Advanced reporting
- [ ] Email/SMS notifications

### Phase 3 (Future)
- [ ] Machine learning for demand forecasting
- [ ] Automated reordering
- [ ] Advanced analytics and BI
- [ ] Integration with other systems
- [ ] API marketplace

## 🎓 Training Materials

Training documentation and user guides are available in the system documentation folder.

---

**Built with ❤️ for the Kikori Basin community**
