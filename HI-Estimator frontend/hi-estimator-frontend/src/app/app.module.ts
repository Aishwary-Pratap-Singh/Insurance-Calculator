import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/material-module'
import {NgxMatFileInputModule} from '@angular-material-components/file-input';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';


// npm install --save @angular/flex-layout @angular/cdk
import { FlexLayoutModule } from "@angular/flex-layout";

import { TestComponent } from './test/test.component';
import { RequestComponent } from './request/request.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HistoryComponent } from './history/history.component';
import { DisplayHistoryComponent } from './display-history/display-history.component';
import { ClaimHistoryDisplayComponent } from './claim-history-display/claim-history-display.component';
import { UserDetailsInputComponent } from './user-details-input/user-details-input.component';
import { ProfilePicUploadComponent } from './profile-pic-upload/profile-pic-upload.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { PrintComponent } from './print/print.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    TestComponent,
    RequestComponent,
    HomeDashboardComponent,
    ErrorComponent,
    UserProfileComponent,
    HistoryComponent,
    DisplayHistoryComponent,
    ClaimHistoryDisplayComponent,
    UserDetailsInputComponent,
    ProfilePicUploadComponent,
    AdminHistoryComponent,
    PrintComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMatFileInputModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
    MatTabsModule,
    MatExpansionModule,
    NgbModule,
    MatSnackBarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
