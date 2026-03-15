// User Roles
export type UserRole =
  | 'system_administrator'
  | 'warehouse_manager'
  | 'inventory_controller'
  | 'cold_chain_officer'
  | 'receiving_clerk'
  | 'dispatch_clerk'
  | 'quality_officer'
  | 'hub_coordinator'
  | 'executive_viewer';

export interface UserProfile {
  id: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  assigned_warehouse_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Facility Types
export type FacilityType =
  | 'Main Warehouse'
  | 'Secondary Warehouse'
  | 'Cold Room'
  | 'Chiller'
  | 'Freezer Room'
  | 'Feed Store'
  | 'Chemical Store'
  | 'Spare Parts Store'
  | 'Export Holding Area'
  | 'Processing Intake Store'
  | 'Transit Store';

export interface Warehouse {
  warehouse_id: string;
  warehouse_name: string;
  warehouse_code: string;
  facility_type: FacilityType;
  province?: string;
  district?: string;
  llg?: string;
  ward?: string;
  gps_latitude?: number;
  gps_longitude?: number;
  hub_site_id?: string;
  manager_name?: string;
  phone?: string;
  capacity_m3?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Storage Types
export type StorageType =
  | 'Ambient'
  | 'Chilled'
  | 'Frozen'
  | 'Hazardous'
  | 'Dry Bulk'
  | 'Palletized'
  | 'Loose Stock'
  | 'Quarantine';

export interface StorageLocation {
  location_id: string;
  warehouse_id: string;
  zone_name: string;
  rack_code?: string;
  bin_code?: string;
  storage_type: StorageType;
  temperature_range?: string;
  capacity_limit?: number;
  current_utilization?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Item Categories
export type ItemCategory =
  | 'Fresh Produce'
  | 'Cocoa'
  | 'Seafood'
  | 'Feed'
  | 'Fertilizer'
  | 'Chemicals'
  | 'Packaging'
  | 'Spare Parts'
  | 'Tools'
  | 'Medical Supplies'
  | 'General Consumables';

export type StorageRequirement =
  | 'Ambient'
  | 'Cool'
  | 'Chilled'
  | 'Frozen'
  | 'Hazardous'
  | 'Dry Protected';

export interface Item {
  item_id: string;
  item_code: string;
  item_name: string;
  item_category: ItemCategory;
  unit_of_measure: string;
  storage_requirement: StorageRequirement;
  shelf_life_days?: number;
  reorder_level?: number;
  reorder_quantity?: number;
  traceability_required: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

// Source Types
export type SourceType =
  | 'Farm Harvest'
  | 'Aquaculture Harvest'
  | 'Supplier Delivery'
  | 'Inter-Warehouse Transfer'
  | 'Return to Store'
  | 'Processing Return';

export interface GoodsReceipt {
  receipt_id: string;
  receipt_number: string;
  receipt_date: string;
  source_type: SourceType;
  source_reference?: string;
  source_location?: string;
  warehouse_id: string;
  received_by?: string;
  inspection_status: string;
  status: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

export interface ReceiptLine {
  receipt_line_id: string;
  receipt_id: string;
  item_id: string;
  batch_number?: string;
  lot_number?: string;
  quantity_received: number;
  unit_of_measure: string;
  weight?: number;
  expiry_date?: string;
  quality_grade?: string;
  temperature_on_arrival?: number;
  location_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BatchTraceability {
  trace_id: string;
  item_id: string;
  batch_number: string;
  lot_number?: string;
  source_type?: string;
  source_reference?: string;
  production_date?: string;
  receipt_date?: string;
  expiry_date?: string;
  quality_status: string;
  current_quantity: number;
  warehouse_id: string;
  location_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Movement Types
export type MovementType =
  | 'Putaway'
  | 'Reallocation'
  | 'Transfer'
  | 'Quarantine Move'
  | 'Processing Issue'
  | 'Dispatch Staging';

export interface StockMovement {
  movement_id: string;
  movement_type: MovementType;
  movement_date: string;
  item_id: string;
  batch_number?: string;
  from_location_id?: string;
  to_location_id?: string;
  quantity: number;
  authorized_by?: string;
  performed_by?: string;
  status: string;
  remarks?: string;
  created_at: string;
}

export interface WarehouseTransfer {
  transfer_id: string;
  transfer_number: string;
  request_date: string;
  from_warehouse_id: string;
  to_warehouse_id: string;
  transfer_reason?: string;
  dispatch_status: string;
  receipt_status: string;
  requested_by?: string;
  approved_by?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TransferLine {
  transfer_line_id: string;
  transfer_id: string;
  item_id: string;
  batch_number?: string;
  quantity_requested: number;
  quantity_dispatched: number;
  quantity_received: number;
  variance: number;
  created_at: string;
  updated_at: string;
}

// Request Types
export type RequestType =
  | 'Farm Inputs'
  | 'Hatchery Feed'
  | 'Processing Consumption'
  | 'Maintenance Use'
  | 'Packaging Use'
  | 'Logistics Use'
  | 'Export Allocation';

export interface IssueRequest {
  issue_request_id: string;
  request_number: string;
  request_date: string;
  requesting_department?: string;
  request_type: RequestType;
  destination_site?: string;
  requested_by?: string;
  required_date?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IssueLine {
  issue_line_id: string;
  issue_request_id: string;
  item_id: string;
  quantity_requested: number;
  quantity_approved: number;
  quantity_issued: number;
  batch_number?: string;
  issue_date?: string;
  issued_by?: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

export interface StockReservation {
  reservation_id: string;
  item_id: string;
  batch_number?: string;
  reserved_quantity: number;
  reserved_for: string;
  reference_id?: string;
  reservation_date: string;
  expiry_date?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Temperature Monitoring
export interface TemperatureLog {
  temp_log_id: string;
  warehouse_id: string;
  location_id?: string;
  log_date: string;
  log_time: string;
  temperature_value: number;
  humidity_value?: number;
  recorded_by?: string;
  device_reference?: string;
  status: string;
  remarks?: string;
  created_at: string;
}

export type AlertType =
  | 'Over Temperature'
  | 'Under Temperature'
  | 'Power Failure'
  | 'Door Open Too Long'
  | 'Sensor Error';

export interface ColdChainAlert {
  alert_id: string;
  warehouse_id: string;
  location_id?: string;
  alert_type: AlertType;
  alert_datetime: string;
  temperature_value?: number;
  threshold_value?: number;
  severity: string;
  status: string;
  resolved_by?: string;
  resolved_at?: string;
  resolution_notes?: string;
  created_at: string;
}

// Stock Counts
export type CountType = 'Full Count' | 'Cycle Count' | 'Spot Check' | 'Year End';

export interface StockCount {
  count_id: string;
  count_number: string;
  warehouse_id: string;
  count_type: CountType;
  count_date: string;
  conducted_by?: string;
  approved_by?: string;
  status: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

export interface CountLine {
  count_line_id: string;
  count_id: string;
  item_id: string;
  batch_number?: string;
  location_id?: string;
  system_quantity: number;
  physical_quantity?: number;
  variance?: number;
  variance_reason?: string;
  created_at: string;
  updated_at: string;
}

// Adjustments
export type AdjustmentType =
  | 'Gain'
  | 'Loss'
  | 'Damage'
  | 'Spoilage'
  | 'Expiry'
  | 'Miscount Correction'
  | 'Theft'
  | 'Quality Rejection';

export interface InventoryAdjustment {
  adjustment_id: string;
  adjustment_number: string;
  warehouse_id: string;
  adjustment_date: string;
  adjustment_type: AdjustmentType;
  item_id: string;
  batch_number?: string;
  quantity_adjusted: number;
  reason?: string;
  approved_by?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Expiry and Spoilage
export interface ExpiryWatch {
  expiry_id: string;
  item_id: string;
  batch_number?: string;
  warehouse_id: string;
  expiry_date: string;
  days_to_expiry?: number;
  current_quantity: number;
  alert_status: string;
  created_at: string;
  updated_at: string;
}

export type SpoilageCause =
  | 'Temperature Failure'
  | 'Damage'
  | 'Contamination'
  | 'Expiry'
  | 'Handling Error'
  | 'Pest Damage'
  | 'Water Damage';

export interface SpoilageRecord {
  spoilage_id: string;
  spoilage_number: string;
  item_id: string;
  batch_number?: string;
  warehouse_id: string;
  record_date: string;
  quantity_affected: number;
  cause: SpoilageCause;
  disposal_method?: string;
  approved_by?: string;
  status: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

// Dispatch
export type ReferenceType =
  | 'Export Order'
  | 'Processing Order'
  | 'Transfer'
  | 'Sales Order'
  | 'General Dispatch';

export interface DispatchPreparation {
  dispatch_prep_id: string;
  dispatch_number: string;
  reference_type: ReferenceType;
  reference_id?: string;
  warehouse_id: string;
  prep_date: string;
  destination?: string;
  prepared_by?: string;
  status: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

export interface DispatchPrepLine {
  dispatch_prep_line_id: string;
  dispatch_prep_id: string;
  item_id: string;
  batch_number?: string;
  quantity_picked: number;
  packing_type?: string;
  temperature_requirement?: string;
  loading_status: string;
  created_at: string;
  updated_at: string;
}

// Analytics
export interface StockBalance {
  item_id: string;
  item_code: string;
  item_name: string;
  item_category: ItemCategory;
  batch_number?: string;
  lot_number?: string;
  warehouse_id: string;
  warehouse_name: string;
  location_id?: string;
  zone_name?: string;
  rack_code?: string;
  bin_code?: string;
  total_quantity: number;
  unit_of_measure: string;
  expiry_date?: string;
  quality_status: string;
  status: string;
}

export interface DashboardMetrics {
  total_warehouses: number;
  active_warehouses: number;
  total_items: number;
  total_stock_value: number;
  near_expiry_items: number;
  cold_chain_alerts: number;
  pending_receipts: number;
  pending_issues: number;
  spoilage_this_month: number;
}
