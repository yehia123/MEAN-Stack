import { Post } from './post.model';
/** Subject is similar to event emitter */
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
/** Injectable can be used to directly put it in providers array */

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post [] = [];
  private postsUpdated = new Subject<Post[]>();
  /** get http client */
  constructor(private http: HttpClient) {}

/** Spraed operator
* Uses this in provider array to allow use in different component
* Uses http get (generic method) to connect with express backend
* to listen you need subscribe(neew data, error, when it completes)
* get formats the data for us
* Pipe() is an operator that maps
* takes the data posted maps it into the new array with specified content with map() method
*/
  getPosts() {
    this.http
    .get<{message: string, posts: any}>(
      'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  /** Returns an object (obserable) that we can listen to */
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  /**
   * pull out all the objects in the arrray, then fetch it into the post service
   * @param id for rout
   */
  getPost(id: string) {
    return {...this.posts.find(p => p.id === id)};
  }
  /** Async posts if succesful from server side by addingt it in subscribe method */
  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http
      .post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
  /** Add Authorization part */
  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
