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
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CommonModule } from '@angular/common';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { CrearMedicoComponent } from './crear-medico/crear-medico.component';
import { VerConsultasClienteComponent } from './ver-consultas-cliente/ver-consultas-cliente.component';
import { VerConsultasMedicoComponent } from './ver-consultas-medico/ver-consultas-medico.component';
import { PerfilComponent } from './perfil/perfil.component';
@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        jqxCalendarComponent,
        CrearPacienteComponent,
        CrearMedicoComponent,
        VerConsultasClienteComponent,
        VerConsultasMedicoComponent,
        PerfilComponent
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