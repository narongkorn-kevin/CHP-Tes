export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface CompanyProfile {
  id: number;
  name_th: string;
  name_en: string;
  tax_id: number;
  email: string;
  phone: number;
  fax: number;
  contact: string;
  address: string;
  website: string;
  map: string;
  logo: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyProfileResponse extends CompanyProfile {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}
export interface Company {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyResponse extends Company {
  code: string;
  status: string;
  message: string;
  data: [];
  role: Roles;
}

// branch
export interface Branch {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  status: number;
}

export interface BranchResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

// division
export interface Division {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface DivisionResponse extends Division {
  code: string;
  status: string;
  message: string;
  data: [];
  role: Roles;
}

// department
export interface Department {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface DepartmentResponse extends Department {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
  };
  role: Roles;
  draw: number;
  to: number;
  total: number;
}

// position
export interface Position {
  id: number;
  name: string;
  // name_th: string;
  // name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface PositionResponse extends Position {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

// employee
export interface Employee {
  id: number;
  prefix_id: string;
  company_id: string;
  permission_id: number;
  branch_id: number;
  division_id: string;
  department_id: number;
  position_id: string;
  person_type_id: string;
  position_group_id: string;
  position_type_id: string;
  position_level_id: string;
  person_id: string;
  card_id: string;
  name: string;
  name_en: string;
  status: string;
  work: string;
  sex: string;
  position_number: string;
  phone: string;
  email: string;
  id_card: string;
  birthday: string;
  date_start_work: string;
  date_test_work: string;
  date_retire: string;
  date_disable: string;
  date_leaved: string;
  leaved_id: string;
  pic: string;
  sort: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  image_url: string;
  signature: string;
  signature_url: string;
  line_token: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
}

export interface EmployeeResponse extends Employee {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface Gender {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface Prefix {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface GenderResponse extends Gender {
  code: string;
  status: string;
  message: string;
  data: [];
  role: Roles;
}

export interface PrefixResponse extends Prefix {
  code: string;
  status: string;
  message: string;
  data: [];
  role: Roles;
}

export interface Permission {
  id: number;
  permission_id: number;
  name: string;
  menu_name: [];
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface PermissionResponse extends Permission {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface ItemType {
  id: number;
  name: string;
  initial: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface ItemTypeResponse extends ItemType {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface Size {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface SizeResponse extends Size {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface Item {
  id: number;
  item_type_id: number;
  item_id: number;
  name: string;
  size: string;
  min: number;
  max: number;
  qty: number;
  ite: string;
  image: string;
  price: string;
  price_per_set: string;
  unit_sell_id: number;
  unit_buy_id: number;
  unit_store_id: number;
  material_type_id: number;
  material_grade_id: number;
  material_color_id: number;
  material_manufactu_id: number;
  spare_type_id: number;
  location_id: number;
  size_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  select_file: string;
  status: string;
}
export interface ItemResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}
export interface Register {
  id: number;
  prefix_id: string;
  company_id: string;
  permission_id: number;
  branch_id: number;
  division_id: string;
  department_id: number;
  position_id: string;
  person_type_id: string;
  position_group_id: string;
  position_type_id: string;
  position_level_id: string;
  person_id: string;
  card_id: string;
  name: string;
  name_en: string;
  status: string;
  work: string;
  sex: string;
  position_number: string;
  phone: string;
  email: string;
  id_card: string;
  birthday: string;
  date_start_work: string;
  date_test_work: string;
  date_retire: string;
  date_disable: string;
  date_leaved: string;
  leaved_id: string;
  pic: string;
  sort: string;
}
export interface Deposit {
  id: number;
  item_id: number;
  item_type_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
  doc_id: number;
  report_id: string;
  date: string;
  status: string;
  status_by: string;
  status_at: string;
  reason: string;
  pdf_path: string;
}
export interface RegisterResponse extends Register {
  select_file: string;
}
export interface DepositResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface Vendor {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  adress: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  status: number;
}
export interface VendorResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}
export interface Withdraw {
  id: number;
  item_id: number;
  item_type_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
  doc_id: number;
  report_id: string;
  date: string;
  status: string;
  status_by: string;
  status_at: string;
  reason: string;
  pdf_path: string;
}

export interface WithdrawResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface ForgotPassword {
  id: number;
  name_th: string;
  email: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface Doc {
  id: number;
  name: string;
  user_appove: string;
  prefix: string;
  run_number: string;
  controll_number: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface DocResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface Location {
  id: number;
  warehouse_id: number;
  name: string;
  code: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface LocationResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}
export interface Movement {
  id: number;
  item_id: number;
  item_type_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
  doc_id: number;
  report_id: string;
  date: string;
  status: string;
  status_by: string;
  status_at: string;
  reason: string;
  pdf_path: string;
}

export interface MovementResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface Unit {
  id: number;
  description: number;
  name: string;
  code: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface UnitResponse extends Unit {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface UnitConvertion {
  id: number;
  item_type_id: number;
  unit_id: number;
  name: string;
  description: number;
  value: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface UnitConvertionResponse extends UnitConvertion {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}
export interface Warehouse {
  id: number;
  name: string;
  code: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface WarehouseResponse extends Warehouse {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface Customer {
  data: any;
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: number;
  adress: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  status: number;
  No: number;
}
export interface CustomerResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface MaterialGrade {
  id: number;
  name: string;
  code: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
  doc_id: number;
  report_id: string;
  date: string;
  status: string;
  status_by: string;
  status_at: string;
  reason: string;
  pdf_path: string;
}

export interface MaterialGradeResponse extends MaterialGrade {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface MaterialType {
  id: number;
  name: string;
  code: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface MaterialTypeResponse extends MaterialType {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface MaterialColor {
  id: number;
  name: string;
  code: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface MaterialColorResponse extends MaterialColor {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface SpareType {
  id: number;
  name: string;
  code: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface SpareTypeResponse extends SpareType {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface Adjust {
  id: number;
  item_id: number;
  item_type_id: number;
  adjust_type: string;
  qty: number;
  remark: number;
  location_1_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  No: number;
}
export interface AdjustResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface SaleOrder {
  id: number;
  name: string;
  code: number;
  file: string;
  customer_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface SaleOrderResponse extends SaleOrder {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}
export interface ItemTran {
  id: number;
  item_id: number;
  item_type_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
  doc_id: number;
  report_id: string;
  date: string;
  status: string;
  status_by: string;
  status_at: string;
  reason: string;
  pdf_path: string;
}

export interface ItemTranResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface ItemLot {
  id: number;
  item_id: number;
  item_type_id: number;
  item_lot_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
  doc_id: number;
  report_id: string;
  date: string;
  status: string;
  status_by: string;
  status_at: string;
  reason: string;
  pdf_path: string;
}

export interface ItemLotResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface Forcash {
  id: number;
  fc_id: number;
  year: number;
  customer_id: number;
  customer: string;
  forcash_lines: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  select_file: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
  doc_id: number;
  report_id: string;
  date: string;
  status: string;
  status_by: string;
  status_at: string;
  reason: string;
  pdf_path: string;
}

export interface ForcashResponse extends Forcash {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface Customer {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: number;
  adress: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface CustomerResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
}


export interface StockControl {
  id: number;
  name: string;
  item_type_id: number;
  approver_id: number;
  manager_id: number;
  status: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface StockControlResponse extends StockControl {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
}
  export interface ConfigStock {
    id: number;
    stock_dead: number;
    stock_slow: number;
    create_by: string;
    update_by: string;
    created_at: string;
    updated_at: string;
  }
  export interface ConfigStockResponse extends ConfigStock {
    code: number;
    status: string;
    message: string;
    data: {
      data: any[],
      draw: number;
      to: number;
      total: number;
    }

}
export interface Machine {
  id: number;
  name: string;
  setup_time: number;
  status: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface MachineResponse extends Machine {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  }
}
export interface Station {
  id: number;
  name: string;
  description: string;
  status: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface StationResponse extends Station {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  }
}


export interface Bom {
  id: number;
  item_id: string;
  unit_convertion_id: string;
  bom_id: string;
  bom_name: string;
  qty: string;
  bomLine: string;
  seq: string;
  master_item_id: string;
  status: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface BomResponse extends Bom {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  }
}

export interface Routing {
  id: number;
  name: string;
  description: string;
  std_time: number;
  reason: string;
  active: string;
  bomLine: string;
  seq: string;
  master_item_id: string;
  status: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface RoutingResponse extends Routing {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  }
}

export interface BomTree {
  bom_id:string,
  bom_name:string,
  item_id:string,
  qty:number
  unit_convertion_id:string
}


export interface Job {
  id: number;
  routing_id: number;
  bom_id: number;
  unit_convertion_id: number;
  qty: number;
  active: string;
  start_date: string;
  seq: string;
  master_item_id: string;
  status: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface JobResponse extends Job {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  }
}

export interface Disease {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface DiseaseResponse extends Disease {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface Benefit {
  id: number;
  name: string;
  pregnant: number;
  age: number;
  sex: number;
  disease_id: number;
  service_group_id: number;
  group_taget: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  status: string;

}

export interface BenefitResponse extends Benefit {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface ServiceGroup {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  status: string;

}

export interface ServiceGroupResponse extends ServiceGroup {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}
export interface Service {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  status: string;

}

export interface ServiceResponse extends Service {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface Officer {
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  status: string;

}

export interface OfficerResponse extends Officer {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface Event {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  status: string;

}

export interface EventResponse extends Event {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}

export interface EventForm {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  status: string;

}

export interface EventFormResponse extends Event {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[];
    draw: number;
    to: number;
    total: number;
  };
}


