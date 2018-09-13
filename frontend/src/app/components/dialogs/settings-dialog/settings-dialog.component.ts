import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  public interval: number;

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>) {
  }

  ngOnInit() {
  }

}
