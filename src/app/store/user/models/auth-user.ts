interface User {
  name: string;
  email: string;
}

interface Company {
  id: number;
  ruc: string;
  company_name: string;
  company_type: string;
  images: {
    logo: string;
    logo_sm: string;
  }
  location: {
    latitude: string;
    longitude: string;
  };
}

type TypePermission = 'menu'  | 'option' | 'api';
export interface Permissions {
  id: number;
  name: string;
  type: TypePermission;
  route: string;
}
export interface AuthUser {
  user: User;
  grant: {id: number; name: string};
  company: Company;
  subscriptions: [];
  permissions: Permissions[];
}
