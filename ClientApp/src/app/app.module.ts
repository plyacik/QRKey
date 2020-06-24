import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatAutocompleteModule, MatRippleModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AdminComponent } from './admin/admin.component';
import { QrkeyComponent } from './admin/qrkey/qrkey.component';
import { InviteQkkeyComponent } from './admin/invite-qkkey/invite-qkkey.component';
import { DialogBoxComponent } from './admin/dialog-box/dialog-box.component';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

registerLocaleData(localeUk, 'uk-UA');

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AdminComponent,
    QrkeyComponent,
    InviteQkkeyComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    QRCodeModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatSliderModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTabsModule,
    MatTreeModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatRadioModule,
    MatProgressBarModule,
    MatMenuModule,
    MatChipsModule,
    CdkTableModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDividerModule,
    MatStepperModule,
    MatBottomSheetModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    CdkTreeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScrollingModule,
    CdkStepperModule,
    DragDropModule,
    PortalModule,
    MatSelectModule,
    A11yModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatRippleModule,
    BrowserAnimationsModule,
    TextMaskModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
      {
        path: 'admin', component: AdminComponent, children: [
          { path: 'qrkey', component: QrkeyComponent, canActivate: [AuthorizeGuard] },
          { path: 'invite-qrkey', component: InviteQkkeyComponent, canActivate: [AuthorizeGuard] },
        ]
      },
    ])
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
