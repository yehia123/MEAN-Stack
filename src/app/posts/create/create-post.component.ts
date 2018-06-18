import { Component, EventEmitter } from '@angular/core';
/* Component which creates a rental post
* onAddPost() currently uses two way binding with enteredValue
* EventEmitter
*/
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  enteredTitle = '';
  enteredDesc = '';
  postCreated = new EventEmitter();


  rentSelection = '';
  shippingSelection = '';
  renLength = '';

  onAddPost() {
    const post = {
      title: this.enteredTitle,
      content: this.enteredDesc
    };
    this.postCreated.emit(post);
  }
}
