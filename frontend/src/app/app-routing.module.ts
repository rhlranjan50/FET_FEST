import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RequestComponent } from './pages/request/request.component';
import { RequestStatusComponent } from './pages/request-status/request-status.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component'
import { LocationRegistrationComponent } from './pages/location-registration/location-registration.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { NotificationDetailsComponent } from './pages/notification-details/notification-details.component'


const routes: Routes = [
  { path: '', redirectTo: '/userRegister', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'request', component: RequestComponent },
  { path: 'request-status', component: RequestStatusComponent },
  {
    path: 'userRegister',
    component: UserRegistrationComponent,
    data: {
      title: 'User Registration'
    }

  },
  {
    path: 'locationRegister',
    component: LocationRegistrationComponent,
    data: {
      title: 'Location Registration'
    }

  },
  {
    path: 'notificationDetails',
    component: NotificationDetailsComponent,
    data: {
      title: 'Notification Details'
    }

  },
  { path: '**', redirectTo: '/userRegister' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
