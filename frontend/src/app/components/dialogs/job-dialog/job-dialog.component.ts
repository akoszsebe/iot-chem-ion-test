import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FunctionapproximationService} from '../../../services/functionapproximation/functionapproximation.service';
import {ValuePairDO} from "../../../models/value-pair";

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']
})
export class JobDialogComponent implements OnInit {

  public jobEndDate: Date;
  public jobDescription = '';
  public minJobEndDate: Date = new Date();
  public valuePairLists: {'name': string, 'id': string, 'description': string}[] = [];
  public  selected: {'name': string, 'id': string, 'description': string};
  public selectedValues: string;
  public selectedInterpolation: string;

  constructor(public dialogRef: MatDialogRef<JobDialogComponent>, private functionapproximationService: FunctionapproximationService) {
  }

  ngOnInit() {
    this.jobEndDate = new Date();
    this.jobEndDate.setDate((new Date()).getDate() + 1);
    this.functionapproximationService.getValuePairs(resp => {
      for (var row in resp.json()) {
        this.valuePairLists.push({name: resp.json()[row].name, id: resp.json()[row]._id, description: resp.json()[row].comment});
      }
      this.selected = this.valuePairLists[0];
    });
  }

}
