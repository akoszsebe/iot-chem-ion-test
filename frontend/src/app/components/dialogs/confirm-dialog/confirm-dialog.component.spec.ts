import {async, TestBed} from '@angular/core/testing';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMatModule} from '../../../../custom-md/custom-md.module';


@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CustomMatModule, BrowserAnimationsModule],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
})

class TestModule {
}

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    })
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(ConfirmDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
