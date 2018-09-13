import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentComponent} from '../app/components/experiment/experiment.component';
import {IonApproximationComponent} from '../app/components/ionapproximation/ionapproximation.component';
import {LoginComponent} from '../app/components/login/login.component';
import {ReportsComponent} from '../app/components/reports/reports.component';
import {AuthGuardService} from '../app/services/auth-guard/auth-guard.service';
import {FeedbackComponent} from '../app/components/feedback/feedback.component';
import {CalibrationComponent} from '../app/components/calibration/calibration.component';


const routes: Routes = [
    {path: '', redirectTo: '/experiment', pathMatch: 'full'},
    {path: 'experiment', component: ExperimentComponent, canActivate: [AuthGuardService]},
    {path: 'ionapproximation', component: IonApproximationComponent, canActivate: [AuthGuardService]},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
    {path: 'reports', component: ReportsComponent, canActivate: [AuthGuardService]},
    {path: 'calibration', component: CalibrationComponent, canActivate: [AuthGuardService]},
    {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuardService]},
    {path: '**', component: ExperimentComponent, canActivate: [AuthGuardService]},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
