import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';
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
  /** The Emitter along with the output is what connects this
   * file to the outside and parent component such as app.comp.html/ts
   * generic type Post <> similar to Java
   */

  constructor(public postsService: PostService) {}

  rentSelection = '';
  shippingSelection = '';
  renLength = '';

  onAddPost(form: NgForm) {
    /** exits the method and the post does not get added */
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
