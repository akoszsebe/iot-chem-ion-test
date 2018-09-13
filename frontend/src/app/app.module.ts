import {SidenavComponent} from './components/sidenav/sidenav.component';
import {LoginComponent} from './components/login/login.component';
import {ReportsComponent} from './components/reports/reports.component';
import {SettingsDialogComponent} from './components/dialogs/settings-dialog/settings-dialog.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {JustgageModule} from 'angular2-justgage';
import {AppRoutingModule} from '../app-routing/app-routing.module';
import {CalendarModule, MessagesModule, ProgressBarModule, StepsModule} from 'primeng/primeng';
import {TempService} from './services/temp/temp.service';
import {AuthService} from './services/auth/auth.service';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {DialogService} from './services/dialog/dialog.service';
import {ChartModule} from 'primeng/components/chart/chart';
import {FunctionapproximationService} from './services/functionapproximation/functionapproximation.service';
//
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';


import {IonService} from './services/ion/ion.service';
import {ConductivityService} from './services/conductivity/conductivity.service';
import {ExperimentComponent} from './components/experiment/experiment.component';
import {JobService} from './services/job/job.service';
import {JobDialogComponent} from './components/dialogs/job-dialog/job-dialog.component';
import {CountDown} from 'angular2-simple-countdown/lib/countdown';
import {FeedbackComponent} from './components/feedback/feedback.component';
import {FeedbackService} from './services/feedback/feedback.service';
import {ConfirmDialogComponent} from './components/dialogs/confirm-dialog/confirm-dialog.component';
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalibrationComponent} from './components/calibration/calibration.component';
import {CalibrationService} from './services/calibration/calibration.service';
import {DeviceService} from './services/device/device.service';
import {CustomMatModule} from '../custom-md/custom-md.module';
import {IonApproximationComponent} from './components/ionapproximation/ionapproximation.component';


@NgModule({
    declarations: [
        ExperimentComponent,
        SidenavComponent,
        LoginComponent,
        ReportsComponent,
        FeedbackComponent,
        SettingsDialogComponent,
        JobDialogComponent,
        CountDown,
        FeedbackComponent,
        ConfirmDialogComponent,
        CalibrationComponent,
        IonApproximationComponent
    ],
    entryComponents: [
        SettingsDialogComponent,
        JobDialogComponent,
        ConfirmDialogComponent,
        IonApproximationComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        JustgageModule,
        CustomMatModule,
        AppRoutingModule,
        CalendarModule,
        ChartModule,
        ProgressBarModule,
        MessagesModule,
        StepsModule,
        CommonModule
    ],
    providers: [
        IonService,
        TempService,
        ConductivityService,
        AuthService,
        AuthGuardService,
        DialogService,
        JobService,
        FeedbackService,
        CalibrationService,
        DeviceService,
        FunctionapproximationService,
        {provide: LOCALE_ID, useValue: 'ro-RO'}
    ],
    bootstrap: [SidenavComponent]
})
export class AppModule {
}
