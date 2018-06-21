import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  /** JS Object which has the different
  * @Input connects it only to the direct component on the parent
  */
  // posts = [
  //  { title: 'ForkLift', content: 'One Week, No Shipping, 500$'},
  //   {title: 'Drill', content: 'Two Weeks, Shipping, 200$'},
  //  { title: 'BobCat', content: 'three Weeks, No Shipping, 900$'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostService) {}
  /** The\
   * Subscrption allows it to render
   */
  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
      this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
