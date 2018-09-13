import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {SettingsDialogComponent} from '../../components/dialogs/settings-dialog/settings-dialog.component';
import {JobDialogComponent} from '../../components/dialogs/job-dialog/job-dialog.component';
import {ConfirmDialogComponent} from '../../components/dialogs/confirm-dialog/confirm-dialog.component';


@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public openSettings(interval: number): Observable<number[]> {
    let dialogRef: MatDialogRef<SettingsDialogComponent>;
    dialogRef = this.dialog.open(SettingsDialogComponent);

    dialogRef.componentInstance.interval = interval;
    return dialogRef.afterClosed();
  }



  public openNewJob(): Observable<[Date, string]> {
    let dialogRef: MatDialogRef<JobDialogComponent>;
    dialogRef = this.dialog.open(JobDialogComponent, {width: '350px', disableClose: true});

    return dialogRef.afterClosed();
  }

  public openConfirmation(message: String): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent, {disableClose: true});
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }


}
