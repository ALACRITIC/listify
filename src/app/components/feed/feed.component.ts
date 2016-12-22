import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getUserList } from '../../reducers/index';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'ist-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  private subscription: Subscription;
  private userListId: string;
  tweets;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private api: ApiService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params:any) => {
        this.userListId = params['id'];
        this.api.getListTimeLine(this.userListId).subscribe(response => {
          this.tweets = response;
        });
      })
  }
}
