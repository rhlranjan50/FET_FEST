import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Pages
import { AppComponent } from './app.component';
import { RequestComponent } from './pages/request';
// Components
import { FileUploadComponent } from './components/file-upload';
import { HeaderComponent } from './components/header';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { LocationRegistrationComponent } from './pages/location-registration/location-registration.component';
import { NotificationDetailsComponent } from './pages/notification-details/notification-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BloodDonationEventsComponent } from './pages/blood-donation-events/blood-donation-events.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HeaderComponent,
    RequestComponent,
    UserRegistrationComponent,
    LocationRegistrationComponent,
    NotificationDetailsComponent,
    DashboardComponent,
    BloodDonationEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
