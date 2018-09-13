import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public message: String;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit() {
  }

}
