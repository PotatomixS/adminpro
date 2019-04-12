import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
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
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { CommonModule } from '@angular/common';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { CrearMedicoComponent } from './crear-medico/crear-medico.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        jqxCalendarComponent,
        CrearPacienteComponent,
        CrearMedicoComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
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