import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  /** JS Object which has the different  */
  posts = [
    { title: 'ForkLift', content: 'One Week, No Shipping, 500$'},
     {title: 'Drill', content: 'Two Weeks, Shipping, 200$'},
    { title: 'BobCat', content: 'three Weeks, No Shipping, 900$'}
  ];
}
