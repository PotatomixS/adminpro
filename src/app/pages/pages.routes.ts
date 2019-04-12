import { RouterModule,Routes } from '@angular/router';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { CrearMedicoComponent } from './crear-medico/crear-medico.component';

const pagesRoutes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Calendario' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Rxjs' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Ajustes del tema' } },
            { path: 'crearPaciente', component: CrearPacienteComponent, data: { titulo: 'Crear Paciente' } },
            { path: 'crearMedico', component: CrearMedicoComponent, data: { titulo: 'Crear Médico' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );