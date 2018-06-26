import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';
import { ModalService } from './create-service';
/* Component which creates a rental post
* onAddPost() currently uses two way binding with enteredValue
* EventEmitter
*/
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  enteredTitle = '';
  enteredDesc = '';
  /** The Emitter along with the output is what connects this
   * file to the outside and parent component such as app.comp.html/ts
   * generic type Post <> similar to Java
   */
  rentSelection = '';
  shippingSelection = '';
  renLength = '';

  constructor(
    public postsService: PostService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
      this.enteredDesc = 'Please enter detailed descrpition';
  }

  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  onAddPost(form: NgForm) {
    /** exits the method and the post does not get added */
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
