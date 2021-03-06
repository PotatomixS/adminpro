import { RouterModule,Routes } from '@angular/router';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { CrearMedicoComponent } from './crear-medico/crear-medico.component';
import { VerConsultasClienteComponent } from './ver-consultas-cliente/ver-consultas-cliente.component';
import { VerConsultasMedicoComponent } from './ver-consultas-medico/ver-consultas-medico.component';
import { VerConsultasAdminComponent } from './ver-consultas-admin/ver-consultas-admin.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DarBajaPacienteComponent } from './dar-baja-paciente/dar-baja-paciente.component';

const pagesRoutes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Calendario' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuración de cuenta' } },
            { path: 'verconsultasp', component: VerConsultasClienteComponent, data: { titulo: 'Ver consultas' } },
            { path: 'verconsultasm', component: VerConsultasMedicoComponent, data: { titulo: 'Ver consultas' } },
            { path: 'crearPaciente', component: CrearPacienteComponent, data: { titulo: 'Crear Paciente' } },
            { path: 'crearMedico', component: CrearMedicoComponent, data: { titulo: 'Crear Médico' } },
            { path: 'darbajapaciente', component: DarBajaPacienteComponent, data: { titulo: 'Dar de baja paciente' } },
            { path: 'consultasadmin', component: VerConsultasAdminComponent, data: { titulo: 'Consultas administrador' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );