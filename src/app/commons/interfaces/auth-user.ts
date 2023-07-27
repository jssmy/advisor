interface User {
  name: string;
  email: string;
  grant: {id: number; name: string};
}

interface Company {
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
export interface AuthUser {
  user: User;
  company: Company;
  subscriptions: [];
  permissions: [];
}
