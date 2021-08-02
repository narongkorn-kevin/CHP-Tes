export type Roles = 'SUSCRIPTOR' | 'ADMIN';




// branch

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

export interface RegisterResponse extends Register {
  select_file: string;
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


