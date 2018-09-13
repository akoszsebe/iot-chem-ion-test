import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonApproximationComponent} from './IonApproximation.component';
import {FunctionapproximationService} from '../../services/functionapproximation/functionapproximation.service';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {TableDataSource} from 'angular4-material-table';

describe('IonApproximationComponent', () => {
  let component: IonApproximationComponent;
  let fixture: ComponentFixture<IonApproximationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonApproximationComponent ],
      imports: [ FormsModule, BrowserAnimationsModule, HttpModule],
      providers: [ TableDataSource, FunctionapproximationService, AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonApproximationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
* They are run using the Jasmine javascript test framework
* through the Karma task runner when you use the 'ng test' command.
*
* Suites— describe(string, function) functions, take a title and a function containing one or more specs.
Specs— it(string, function) functions, take a title and a function containing one or more expectations.
Expectations— are assertions that evaluate to true or false. Basic syntax reads expect(actual).toBe(expected)
Matchers — are predefined helpers for common assertions. Eg: toBe(expected), toEqual(expected).
* */

