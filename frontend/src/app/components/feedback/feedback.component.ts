import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../../services/feedback/feedback.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  from: string;
  message: string;
  response: string;

  constructor(private feedbackService: FeedbackService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.checkAuthentication().subscribe(user => {
      if (user) {
        this.from = this.authService.getUser().name;
      }
    });
  }

  sendFeedback() {
    this.feedbackService.sendFeedback(this.from, this.message).subscribe(res => {
      if (res) {
        this.response = 'Thank you for your feedback';
        this.message = '';
      } else {
        this.response = 'Something went wrong, please try again';
      }
    });
  }

}
