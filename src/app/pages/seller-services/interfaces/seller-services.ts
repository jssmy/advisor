type PeriodTime = 'month' | 'year' | 'day';
interface Plan {
  name: string;
  price: number;
  in_time: PeriodTime
}


export interface SellerServices {
  id: number;
  name: string;
  planes: Plan[];
  services_includes: string[];
}
