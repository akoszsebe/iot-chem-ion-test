import { EventEmitter, OnInit, Component, Input, Output, Injectable, ChangeDetectorRef } from '@angular/core';
import { FunctionapproximationService } from '../../services/functionapproximation/functionapproximation.service';
import { TableDataSource } from 'angular4-material-table';
import { Http } from '@angular/http/src/http';


@Component({
  selector: 'app-ion-approximation',
  templateUrl: './ionapproximation.html',
  styleUrls: ['./ionapproximation.component.css']
})

export class IonApproximationComponent implements OnInit {
  displayedColumns = ['conductivity', 'ion', 'actionsColumn'];
  columnsToDisplay = ['Name', 'Comment', 'Conductivity', 'Ion', 'Delete'];
  selectedId = -1;
  approxName: string;
  approxComment: string;
  dataSource: TableDataSource<ValuePairDO>;
  httpDataSource: TableDataSource<ValuePairResponseDO>;
  @Input() valuepairList = [
    new ValuePairDO(1, 1),
    new ValuePairDO(2, 2)
  ];
  @Output() valuepairListChange = new EventEmitter<ValuePairDO[]>();
  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.valuepairList, ValuePairDO);
    this.functionapproximationService.getValuePairs(resp => {
      this.httpDataSource = new TableDataSource<any>(resp.json(), ValuePairResponseDO);
      console.log(resp.json());
    });
    this.dataSource.datasourceSubject.subscribe(valuepairList => {
      this.valuepairListChange.emit(valuepairList);
      this.valuepairList = valuepairList;
      console.log('VALUE PAIR LIST CHANGE: ', valuepairList)
    });
  }
  constructor(private functionapproximationService: FunctionapproximationService,  private changeDetectorRefs: ChangeDetectorRef) {
  }

  delete(row) {
    console.log('row to delete: ', row);
    this.functionapproximationService.deleteValues(row.currentData._id).subscribe(result => {
      console.log('server\'s response to our delete: ', result);
      this.functionapproximationService.getValuePairs(resp => {
        this.httpDataSource = new TableDataSource<any>(resp.json(), ValuePairResponseDO);
        console.log(resp.json());
      });
    });
  }

  selectRow(row) {
    console.log(row);
    this.uploadTableDataToDataSource(row);
  }


  // tabledatasource.rowsSubject. ez array, ebben 0, 1...
  sendValues() {
    console.log(this.valuepairList);
    console.log(this.valuepairListChange);
    console.log(this.dataSource.datasourceSubject);

    console.log(this.selectedId);
    if (this.selectedId === -1) {
      // console.log(this.dataSource.currentData[0]); private :(
      this.functionapproximationService.sendValues(this.valuepairList,
        this.approxName, this.approxComment).subscribe(result => {
        console.log(result);
        this.functionapproximationService.getValuePairs(resp => {
          this.httpDataSource = new TableDataSource<any>(resp.json(), ValuePairResponseDO);
          console.log('get value pairs response after an insert: ', resp.json());
        });
      });

    } else {
      console.log('this will be an UPDATE, not a new element');
      this.functionapproximationService.updateValues(this.selectedId, this.valuepairList,
        this.approxName, this.approxComment).subscribe(result => {
        console.log('AFTER UPDATE RESULT: ', result)
        this.functionapproximationService.getValuePairs(resp => {
          this.httpDataSource = new TableDataSource<any>(resp.json(), ValuePairResponseDO);
          console.log('get value pairs response after an update: ', resp.json());
        });
      });

    }

  }

  uploadTableDataToDataSource(row) {
    this.approxName = row.currentData.name;
    this.approxComment = row.currentData.comment;
    this.selectedId = row.currentData._id;
    const ionArray = row.currentData.ion;
    const conductivityArray = row.currentData.conductivity;
    const newData = [];
    for (const i in ionArray) {
      if (ionArray[i] !== null) {
        newData.push(new ValuePairDO(conductivityArray[i], ionArray[i]));
      }
    }
    console.log(newData);
    this.valuepairList = newData;
    console.log('loaded valuepairList: ', this.valuepairList);
    this.dataSource = new TableDataSource<any>(newData, ValuePairDO)
    this.dataSource.datasourceSubject.subscribe(valuepairList => {
      this.valuepairListChange.emit(valuepairList);
      this.valuepairList = valuepairList;
      console.log('VALUE PAIR LIST CHANGE: ', valuepairList)
    });
  }
}

class ValuePairDO {
  conductivity: number;
  ion: number;
  constructor(conductivity?: number, ion?: number) {
    this.conductivity = conductivity;
    this.ion = ion;
  }
}
class ValuePairResponseDO {
  _id: number;
  name: String;
  comment: String;
  conductivity: [Number];
  ion: [number]
}

