import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string;

  constructor(public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged out';
  }

}
