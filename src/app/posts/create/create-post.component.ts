import { Component } from '@angular/core';
/* Component which creates a rental post
* onAddPost() currently uses two way binding with enteredValue
*/
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  newPost = '';
  enteredValue = '';

  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
