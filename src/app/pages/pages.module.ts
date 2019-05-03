import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { jqxCalendarComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';

// Modulos importados
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

// nge2-charts
import { ChartsModule } from 'ng2-charts';

// temporal
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CommonModule } from '@angular/common';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { CrearMedicoComponent } from './crear-medico/crear-medico.component';
import { VerConsultasClienteComponent } from './ver-consultas-cliente/ver-consultas-cliente.component';
import { VerConsultasMedicoComponent } from './ver-consultas-medico/ver-consultas-medico.component';
import { VerConsultasAdminComponent } from './ver-consultas-admin/ver-consultas-admin.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DarBajaPacienteComponent } from './dar-baja-paciente/dar-baja-paciente.component';
@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        AccountSettingsComponent,
        jqxCalendarComponent,
        CrearPacienteComponent,
        CrearMedicoComponent,
        VerConsultasClienteComponent,
        VerConsultasMedicoComponent,
        VerConsultasAdminComponent,
        PerfilComponent,
        DarBajaPacienteComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
            SharedModule,
            FormsModule,
            PAGES_ROUTES,
            ChartsModule,
            CommonModule
    ]
})
export class PagesModule { }