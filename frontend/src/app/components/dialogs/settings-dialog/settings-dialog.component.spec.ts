import {async, TestBed} from '@angular/core/testing';
import {SettingsDialogComponent} from './settings-dialog.component';
import {MatDialog} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMatModule} from '../../../../custom-md/custom-md.module';

@NgModule({
  declarations: [SettingsDialogComponent],
  imports: [FormsModule, CustomMatModule, BrowserAnimationsModule],
  entryComponents: [SettingsDialogComponent],
  exports: [SettingsDialogComponent],
})

class TestModule {
}

describe('SettingsDialogComponent', () => {
  let component: SettingsDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    })
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(SettingsDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
