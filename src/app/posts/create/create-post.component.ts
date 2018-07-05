import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../posts.service';
import { mimeType } from './mime-type.validator';

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
  isLoading = false;
  imagePreview: string;
  /** The Emitter along with the output is what connects this
   * file to the outside and parent component such as app.comp.html/ts
   * generic type Post <> similar to Java
   */
  rentSelection = '';
  shippingSelection = '';
  renLength = '';



  constructor(
    public postsService: PostService
  ) {}
  /** Control form using Reactive Forms
   * async Validator to check if it is the right type of file
   */
  form = new FormGroup({
    title: new FormControl(null, {
      validators: [Validators.required]
    }),
    content: new FormControl(null, {
      validators: [Validators.required]
    }),
    image: new FormControl(null, {
      validators:
       [Validators.required],
       asyncValidators: [mimeType]
    })
  });
  /** Method in intake the uplaoded image using HTMLInputElement method which
   * gives us access to the files[] array.
   * in this case only the first image uploaded is chosen
   * patchValue() target single control
   */
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
   /** Transform image to url for preview */
   const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result;
   };
   reader.readAsDataURL(file);
  }


  onAddPost() {
    /** exits the method and the post does not get added */
    if (this.form.invalid) {
      return;
    }
    this.postsService.addPost(this.form.value.title, this.form.value.content);
    this.form.reset();
  }

}
