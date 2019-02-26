import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { PagesModule } from './pages/pages.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    SharedModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
