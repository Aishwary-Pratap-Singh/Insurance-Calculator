import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { TestComponent } from './test/test.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './request/request.component';
import { ErrorComponent } from './error/error.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HistoryComponent } from './history/history.component';
import { UserDetailsInputComponent } from './user-details-input/user-details-input.component';
import { ProfilePicUploadComponent } from './profile-pic-upload/profile-pic-upload.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { PrintComponent } from './print/print.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'login', component:LoginComponent },
  { path: 'signup', component:SignupComponent},
  { path:'home/claim',component:TestComponent},
  { path:'admin/policy',component:AdminComponent},
  { path:'admin/request',component:RequestComponent},
  { path: 'admin/history',component:AdminHistoryComponent},
  { path:'home',component:HomeDashboardComponent},
  { path:'error',component:ErrorComponent},
  { path: 'home/profile',component:UserProfileComponent},
  { path: 'home/history',component:HistoryComponent},
  {path:'user',component:UserDetailsInputComponent},
  {path: "image",component:ProfilePicUploadComponent},
  {path: 'print',component:PrintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
