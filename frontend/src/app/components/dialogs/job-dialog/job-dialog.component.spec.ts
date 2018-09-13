import {async, TestBed} from '@angular/core/testing';

import {JobDialogComponent} from './job-dialog.component';
import {MatDialog} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMatModule} from '../../../../custom-md/custom-md.module';

@NgModule({
  declarations: [JobDialogComponent],
  imports: [FormsModule, CustomMatModule, CalendarModule, BrowserAnimationsModule],
  entryComponents: [JobDialogComponent],
  exports: [JobDialogComponent],
})

class TestModule {
}


describe('JobDialogComponent', () => {
  let component: JobDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    })
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(JobDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
