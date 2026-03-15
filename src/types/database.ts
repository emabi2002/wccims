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

export type StorageType =
  | 'Ambient'
  | 'Chilled'
  | 'Frozen'
  | 'Hazardous'
  | 'Dry Bulk'
  | 'Palletized'
  | 'Loose Stock'
  | 'Quarantine';

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

export type SourceType =
  | 'Farm Harvest'
  | 'Aquaculture Harvest'
  | 'Supplier Delivery'
  | 'Inter-Warehouse Transfer'
  | 'Return to Store'
  | 'Processing Return';

export type MovementType =
  | 'Putaway'
  | 'Reallocation'
  | 'Transfer'
  | 'Quarantine Move'
  | 'Processing Issue'
  | 'Dispatch Staging';

export type RequestType =
  | 'Farm Inputs'
  | 'Hatchery Feed'
  | 'Processing Consumption'
  | 'Maintenance Use'
  | 'Packaging Use'
  | 'Logistics Use'
  | 'Export Allocation';

export type AlertType =
  | 'Over Temperature'
  | 'Under Temperature'
  | 'Power Failure'
  | 'Door Open Too Long'
  | 'Sensor Error';

export type CountType =
  | 'Full Count'
  | 'Cycle Count'
  | 'Spot Check'
  | 'Year End';

export type AdjustmentType =
  | 'Gain'
  | 'Loss'
  | 'Damage'
  | 'Spoilage'
  | 'Expiry'
  | 'Miscount Correction'
  | 'Theft'
  | 'Quality Rejection';

export type SpoilageCause =
  | 'Temperature Failure'
  | 'Damage'
  | 'Contamination'
  | 'Expiry'
  | 'Handling Error'
  | 'Pest Damage'
  | 'Water Damage';

export type ReferenceType =
  | 'Export Order'
  | 'Processing Order'
  | 'Transfer'
  | 'Sales Order'
  | 'General Dispatch';

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
