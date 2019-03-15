import { RouterModule,Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { LoginmComponent } from "./loginm/loginm.component";
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'loginm', component: LoginmComponent},
    { path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true} );