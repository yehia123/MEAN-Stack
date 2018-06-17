import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatExpansionModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ToolBarComponent } from './signin/toolbar/toolbar.component';
import { SigninButtonComponent } from './signin/button/signin-button.component';
import { CreateTextComponent } from './posts/text/create-text-post.component';
import { CreatePostComponent } from './posts/create/create-post.component';
import { PostListComponent } from './posts/post-list/post-list.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    SigninButtonComponent,
    CreateTextComponent,
    CreatePostComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
