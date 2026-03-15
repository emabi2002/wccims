-- ============================================
-- WCCIMS Database Schema
-- Warehouse, Cold Chain and Inventory Management System
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER ROLES AND AUTHENTICATION
-- ============================================

CREATE TYPE user_role AS ENUM (
  'system_administrator',
  'warehouse_manager',
  'inventory_controller',
  'cold_chain_officer',
  'receiving_clerk',
  'dispatch_clerk',
  'quality_officer',
  'hub_coordinator',
  'executive_viewer'
);

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL,
  phone TEXT,
  assigned_warehouse_id UUID,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULE 1: WAREHOUSE AND STORAGE FACILITY REGISTRY
-- ============================================

CREATE TYPE facility_type AS ENUM (
  'Main Warehouse',
  'Secondary Warehouse',
  'Cold Room',
  'Chiller',
  'Freezer Room',
  'Feed Store',
  'Chemical Store',
  'Spare Parts Store',
  'Export Holding Area',
  'Processing Intake Store',
  'Transit Store'
);

CREATE TABLE warehouses (
  warehouse_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  warehouse_name TEXT NOT NULL,
  warehouse_code TEXT UNIQUE NOT NULL,
  facility_type facility_type NOT NULL,
  province TEXT,
  district TEXT,
  llg TEXT,
  ward TEXT,
  gps_latitude DECIMAL(10, 8),
  gps_longitude DECIMAL(11, 8),
  hub_site_id TEXT,
  manager_name TEXT,
  phone TEXT,
  capacity_m3 DECIMAL(10, 2),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULE 2: STORAGE ZONE, BIN AND RACK MANAGEMENT
-- ============================================

CREATE TYPE storage_type AS ENUM (
  'Ambient',
  'Chilled',
  'Frozen',
  'Hazardous',
  'Dry Bulk',
  'Palletized',
  'Loose Stock',
  'Quarantine'
);

CREATE TABLE storage_locations (
  location_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  warehouse_id UUID REFERENCES warehouses(warehouse_id) ON DELETE CASCADE,
  zone_name TEXT NOT NULL,
  rack_code TEXT,
  bin_code TEXT,
  storage_type storage_type NOT NULL,
  temperature_range TEXT,
  capacity_limit DECIMAL(10, 2),
  current_utilization DECIMAL(10, 2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(warehouse_id, zone_name, rack_code, bin_code)
);

-- ============================================
-- MODULE 3: ITEM MASTER AND INVENTORY CATALOG
-- ============================================

CREATE TYPE item_category AS ENUM (
  'Fresh Produce',
  'Cocoa',
  'Seafood',
  'Feed',
  'Fertilizer',
  'Chemicals',
  'Packaging',
  'Spare Parts',
  'Tools',
  'Medical Supplies',
  'General Consumables'
);

CREATE TYPE storage_requirement AS ENUM (
  'Ambient',
  'Cool',
  'Chilled',
  'Frozen',
  'Hazardous',
  'Dry Protected'
);

CREATE TABLE items (
  item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_code TEXT UNIQUE NOT NULL,
  item_name TEXT NOT NULL,
  item_category item_category NOT NULL,
  unit_of_measure TEXT NOT NULL,
  storage_requirement storage_requirement NOT NULL,
  shelf_life_days INTEGER,
  reorder_level DECIMAL(10, 2),
  reorder_quantity DECIMAL(10, 2),
  traceability_required BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULE 4: GOODS RECEIVING AND INTAKE MANAGEMENT
-- ============================================

CREATE TYPE source_type AS ENUM (
  'Farm Harvest',
  'Aquaculture Harvest',
  'Supplier Delivery',
  'Inter-Warehouse Transfer',
  'Return to Store',
  'Processing Return'
);

CREATE TABLE goods_receipts (
  receipt_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  receipt_number TEXT UNIQUE NOT NULL,
  receipt_date DATE NOT NULL,
  source_type source_type NOT NULL,
  source_reference TEXT,
  source_location TEXT,
  warehouse_id UUID REFERENCES warehouses(warehouse_id),
  received_by UUID REFERENCES user_profiles(id),
  inspection_status TEXT DEFAULT 'pending',
  status TEXT DEFAULT 'draft',
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE receipt_lines (
  receipt_line_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  receipt_id UUID REFERENCES goods_receipts(receipt_id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT,
  lot_number TEXT,
  quantity_received DECIMAL(10, 2) NOT NULL,
  unit_of_measure TEXT NOT NULL,
  weight DECIMAL(10, 2),
  expiry_date DATE,
  quality_grade TEXT,
  temperature_on_arrival DECIMAL(5, 2),
  location_id UUID REFERENCES storage_locations(location_id),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULE 5: BATCH, LOT AND TRACEABILITY MANAGEMENT
-- ============================================

CREATE TABLE batch_traceability (
  trace_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT NOT NULL,
  lot_number TEXT,
  source_type TEXT,
  source_reference TEXT,
  production_date DATE,
  receipt_date DATE,
  expiry_date DATE,
  quality_status TEXT DEFAULT 'approved',
  current_quantity DECIMAL(10, 2) NOT NULL,
  warehouse_id UUID REFERENCES warehouses(warehouse_id),
  location_id UUID REFERENCES storage_locations(location_id),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(item_id, batch_number, lot_number, warehouse_id)
);

-- ============================================
-- MODULE 6: STOCK MOVEMENT AND TRANSFER MANAGEMENT
-- ============================================

CREATE TYPE movement_type AS ENUM (
  'Putaway',
  'Reallocation',
  'Transfer',
  'Quarantine Move',
  'Processing Issue',
  'Dispatch Staging'
);

CREATE TABLE stock_movements (
  movement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movement_type movement_type NOT NULL,
  movement_date TIMESTAMPTZ DEFAULT NOW(),
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT,
  from_location_id UUID REFERENCES storage_locations(location_id),
  to_location_id UUID REFERENCES storage_locations(location_id),
  quantity DECIMAL(10, 2) NOT NULL,
  authorized_by UUID REFERENCES user_profiles(id),
  performed_by UUID REFERENCES user_profiles(id),
  status TEXT DEFAULT 'completed',
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE warehouse_transfers (
  transfer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transfer_number TEXT UNIQUE NOT NULL,
  request_date DATE NOT NULL,
  from_warehouse_id UUID REFERENCES warehouses(warehouse_id),
  to_warehouse_id UUID REFERENCES warehouses(warehouse_id),
  transfer_reason TEXT,
  dispatch_status TEXT DEFAULT 'pending',
  receipt_status TEXT DEFAULT 'pending',
  requested_by UUID REFERENCES user_profiles(id),
  approved_by UUID REFERENCES user_profiles(id),
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE transfer_lines (
  transfer_line_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transfer_id UUID REFERENCES warehouse_transfers(transfer_id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT,
  quantity_requested DECIMAL(10, 2) NOT NULL,
  quantity_dispatched DECIMAL(10, 2) DEFAULT 0,
  quantity_received DECIMAL(10, 2) DEFAULT 0,
  variance DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULE 7: INVENTORY ISSUE AND RESERVATION MANAGEMENT
-- ============================================

CREATE TYPE request_type AS ENUM (
  'Farm Inputs',
  'Hatchery Feed',
  'Processing Consumption',
  'Maintenance Use',
  'Packaging Use',
  'Logistics Use',
  'Export Allocation'
);

CREATE TABLE issue_requests (
  issue_request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_number TEXT UNIQUE NOT NULL,
  request_date DATE NOT NULL,
  requesting_department TEXT,
  request_type request_type NOT NULL,
  destination_site TEXT,
  requested_by UUID REFERENCES user_profiles(id),
  required_date DATE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE issue_lines (
  issue_line_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_request_id UUID REFERENCES issue_requests(issue_request_id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(item_id),
  quantity_requested DECIMAL(10, 2) NOT NULL,
  quantity_approved DECIMAL(10, 2) DEFAULT 0,
  quantity_issued DECIMAL(10, 2) DEFAULT 0,
  batch_number TEXT,
  issue_date DATE,
  issued_by UUID REFERENCES user_profiles(id),
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stock_reservations (
  reservation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT,
  reserved_quantity DECIMAL(10, 2) NOT NULL,
  reserved_for TEXT NOT NULL,
  reference_id UUID,
  reservation_date DATE NOT NULL,
  expiry_date DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULE 8: COLD CHAIN AND TEMPERATURE MONITORING
-- ============================================

CREATE TABLE temperature_logs (
  temp_log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  warehouse_id UUID REFERENCES warehouses(warehouse_id),
  location_id UUID REFERENCES storage_locations(location_id),
  log_date DATE NOT NULL,
  log_time TIME NOT NULL,
  temperature_value DECIMAL(5, 2) NOT NULL,
  humidity_value DECIMAL(5, 2),
  recorded_by UUID REFERENCES user_profiles(id),
  device_reference TEXT,
  status TEXT DEFAULT 'normal',
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE alert_type AS ENUM (
  'Over Temperature',
  'Under Temperature',
  'Power Failure',
  'Door Open Too Long',
  'Sensor Error'
);

CREATE TABLE cold_chain_alerts (
  alert_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  warehouse_id UUID REFERENCES warehouses(warehouse_id),
  location_id UUID REFERENCES storage_locations(location_id),
  alert_type alert_type NOT NULL,
  alert_datetime TIMESTAMPTZ NOT NULL,
  temperature_value DECIMAL(5, 2),
  threshold_value DECIMAL(5, 2),
  severity TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'open',
  resolved_by UUID REFERENCES user_profiles(id),
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULE 9: STOCK COUNT, RECONCILIATION AND ADJUSTMENT
-- ============================================

CREATE TYPE count_type AS ENUM (
  'Full Count',
  'Cycle Count',
  'Spot Check',
  'Year End'
);

CREATE TABLE stock_counts (
  count_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  count_number TEXT UNIQUE NOT NULL,
  warehouse_id UUID REFERENCES warehouses(warehouse_id),
  count_type count_type NOT NULL,
  count_date DATE NOT NULL,
  conducted_by UUID REFERENCES user_profiles(id),
  approved_by UUID REFERENCES user_profiles(id),
  status TEXT DEFAULT 'in_progress',
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE count_lines (
  count_line_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  count_id UUID REFERENCES stock_counts(count_id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT,
  location_id UUID REFERENCES storage_locations(location_id),
  system_quantity DECIMAL(10, 2) NOT NULL,
  physical_quantity DECIMAL(10, 2),
  variance DECIMAL(10, 2),
  variance_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE adjustment_type AS ENUM (
  'Gain',
  'Loss',
  'Damage',
  'Spoilage',
  'Expiry',
  'Miscount Correction',
  'Theft',
  'Quality Rejection'
);

CREATE TABLE inventory_adjustments (
  adjustment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  adjustment_number TEXT UNIQUE NOT NULL,
  warehouse_id UUID REFERENCES warehouses(warehouse_id),
  adjustment_date DATE NOT NULL,
  adjustment_type adjustment_type NOT NULL,
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT,
  quantity_adjusted DECIMAL(10, 2) NOT NULL,
  reason TEXT,
  approved_by UUID REFERENCES user_profiles(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULE 10: EXPIRY, SPOILAGE AND WASTAGE MANAGEMENT
-- ============================================

CREATE TABLE expiry_watch (
  expiry_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT,
  warehouse_id UUID REFERENCES warehouses(warehouse_id),
  expiry_date DATE NOT NULL,
  days_to_expiry INTEGER,
  current_quantity DECIMAL(10, 2) NOT NULL,
  alert_status TEXT DEFAULT 'ok',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE spoilage_cause AS ENUM (
  'Temperature Failure',
  'Damage',
  'Contamination',
  'Expiry',
  'Handling Error',
  'Pest Damage',
  'Water Damage'
);

CREATE TABLE spoilage_records (
  spoilage_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spoilage_number TEXT UNIQUE NOT NULL,
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT,
  warehouse_id UUID REFERENCES warehouses(warehouse_id),
  record_date DATE NOT NULL,
  quantity_affected DECIMAL(10, 2) NOT NULL,
  cause spoilage_cause NOT NULL,
  disposal_method TEXT,
  approved_by UUID REFERENCES user_profiles(id),
  status TEXT DEFAULT 'pending',
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULE 11: PACKING, DISPATCH STAGING AND LOADING PREPARATION
-- ============================================

CREATE TYPE reference_type AS ENUM (
  'Export Order',
  'Processing Order',
  'Transfer',
  'Sales Order',
  'General Dispatch'
);

CREATE TABLE dispatch_preparations (
  dispatch_prep_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dispatch_number TEXT UNIQUE NOT NULL,
  reference_type reference_type NOT NULL,
  reference_id TEXT,
  warehouse_id UUID REFERENCES warehouses(warehouse_id),
  prep_date DATE NOT NULL,
  destination TEXT,
  prepared_by UUID REFERENCES user_profiles(id),
  status TEXT DEFAULT 'preparing',
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE dispatch_prep_lines (
  dispatch_prep_line_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dispatch_prep_id UUID REFERENCES dispatch_preparations(dispatch_prep_id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(item_id),
  batch_number TEXT,
  quantity_picked DECIMAL(10, 2) NOT NULL,
  packing_type TEXT,
  temperature_requirement TEXT,
  loading_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ANALYTICS AND REPORTING VIEWS
-- ============================================

-- Current Stock Balance View
CREATE OR REPLACE VIEW v_stock_balance AS
SELECT
  bt.item_id,
  i.item_code,
  i.item_name,
  i.item_category,
  bt.batch_number,
  bt.lot_number,
  bt.warehouse_id,
  w.warehouse_name,
  bt.location_id,
  sl.zone_name,
  sl.rack_code,
  sl.bin_code,
  SUM(bt.current_quantity) as total_quantity,
  i.unit_of_measure,
  bt.expiry_date,
  bt.quality_status,
  bt.status
FROM batch_traceability bt
JOIN items i ON bt.item_id = i.item_id
JOIN warehouses w ON bt.warehouse_id = w.warehouse_id
LEFT JOIN storage_locations sl ON bt.location_id = sl.location_id
WHERE bt.status = 'active'
GROUP BY
  bt.item_id, i.item_code, i.item_name, i.item_category,
  bt.batch_number, bt.lot_number, bt.warehouse_id, w.warehouse_name,
  bt.location_id, sl.zone_name, sl.rack_code, sl.bin_code,
  i.unit_of_measure, bt.expiry_date, bt.quality_status, bt.status;

-- Near Expiry Items View
CREATE OR REPLACE VIEW v_near_expiry AS
SELECT
  bt.item_id,
  i.item_code,
  i.item_name,
  bt.batch_number,
  bt.warehouse_id,
  w.warehouse_name,
  bt.expiry_date,
  (bt.expiry_date - CURRENT_DATE) as days_to_expiry,
  bt.current_quantity,
  i.unit_of_measure
FROM batch_traceability bt
JOIN items i ON bt.item_id = i.item_id
JOIN warehouses w ON bt.warehouse_id = w.warehouse_id
WHERE bt.expiry_date IS NOT NULL
  AND bt.expiry_date <= CURRENT_DATE + INTERVAL '30 days'
  AND bt.current_quantity > 0
  AND bt.status = 'active'
ORDER BY bt.expiry_date;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_warehouses_status ON warehouses(status);
CREATE INDEX idx_storage_locations_warehouse ON storage_locations(warehouse_id);
CREATE INDEX idx_items_category ON items(item_category);
CREATE INDEX idx_items_code ON items(item_code);
CREATE INDEX idx_receipts_warehouse ON goods_receipts(warehouse_id);
CREATE INDEX idx_receipts_date ON goods_receipts(receipt_date);
CREATE INDEX idx_batch_item ON batch_traceability(item_id);
CREATE INDEX idx_batch_warehouse ON batch_traceability(warehouse_id);
CREATE INDEX idx_batch_expiry ON batch_traceability(expiry_date);
CREATE INDEX idx_movements_date ON stock_movements(movement_date);
CREATE INDEX idx_temp_logs_warehouse ON temperature_logs(warehouse_id);
CREATE INDEX idx_temp_logs_date ON temperature_logs(log_date);
CREATE INDEX idx_alerts_status ON cold_chain_alerts(status);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE goods_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipt_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_traceability ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouse_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfer_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE issue_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE issue_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE temperature_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cold_chain_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_counts ENABLE ROW LEVEL SECURITY;
ALTER TABLE count_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expiry_watch ENABLE ROW LEVEL SECURITY;
ALTER TABLE spoilage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispatch_preparations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispatch_prep_lines ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (allow authenticated users to read, admins to write)
-- These should be customized based on specific role requirements

CREATE POLICY "Allow read access to authenticated users" ON warehouses
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read access to authenticated users" ON items
  FOR SELECT USING (auth.role() = 'authenticated');

-- Note: Additional granular RLS policies should be added based on user roles
-- For now, allowing authenticated access for development

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_warehouses_updated_at BEFORE UPDATE ON warehouses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_storage_locations_updated_at BEFORE UPDATE ON storage_locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goods_receipts_updated_at BEFORE UPDATE ON goods_receipts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_batch_traceability_updated_at BEFORE UPDATE ON batch_traceability
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_warehouse_transfers_updated_at BEFORE UPDATE ON warehouse_transfers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_issue_requests_updated_at BEFORE UPDATE ON issue_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stock_counts_updated_at BEFORE UPDATE ON stock_counts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_adjustments_updated_at BEFORE UPDATE ON inventory_adjustments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spoilage_records_updated_at BEFORE UPDATE ON spoilage_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dispatch_preparations_updated_at BEFORE UPDATE ON dispatch_preparations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Optional - for development)
-- ============================================

-- Insert sample warehouse
INSERT INTO warehouses (warehouse_name, warehouse_code, facility_type, province, status) VALUES
('Main Central Warehouse', 'WH-001', 'Main Warehouse', 'Gulf', 'active'),
('Cold Storage Facility', 'WH-002', 'Cold Room', 'Gulf', 'active'),
('Freezer Unit Alpha', 'WH-003', 'Freezer Room', 'Gulf', 'active');

-- Insert sample items
INSERT INTO items (item_code, item_name, item_category, unit_of_measure, storage_requirement, traceability_required) VALUES
('COCOA-001', 'Cocoa Beans Premium', 'Cocoa', 'kg', 'Dry Protected', true),
('FISH-001', 'Barramundi Fresh', 'Seafood', 'kg', 'Chilled', true),
('FEED-001', 'Fish Feed Pellets', 'Feed', 'kg', 'Dry Protected', false),
('VEG-001', 'Lettuce Fresh', 'Fresh Produce', 'kg', 'Chilled', true);
