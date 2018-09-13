import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {UserDO} from '../../models/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  user: UserDO = new UserDO('1234', 'Barbi', '', '');
  loggedIn = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.checkAuthentication().subscribe(user => {
      if (user) {
        this.user = this.authService.getUser();
        this.loggedIn = true;
      }
    });
  }
}
