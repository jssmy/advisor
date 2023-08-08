import {RouterModule, Routes} from "@angular/router";
import {GlobalRoutes} from "../../commons/constants/global-routes";
import {ListStationsComponent} from "./list-stations/list-stations.component";
import {StationChildrenRoutes} from "./commons/constants/station-children-routes";
import {FormStationsComponent} from "./form-stations/form-stations.component";

const StationsRoutes: Routes = [
  {
    path: GlobalRoutes.MAIN,
    component: ListStationsComponent
  },
  {
    path: StationChildrenRoutes.FORM,
    component: FormStationsComponent
  }
];

export const STATION_ROUTES_MODULE = RouterModule.forChild(StationsRoutes);
