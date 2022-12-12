import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; offre: any; maxPosts: number }>(
        "http://localhost:5000/api/offre" 
      )
      .pipe(
        map(postData => {
          console.log(postData)
          return {
            posts: postData.offre.map(post => {
              return {
                title: post.title,
                price: post.price,
                id: post._id,
                image: post.image,
                
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        console.log(transformedPostData)
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      price: string;
      date: string;
      image: string;
    }>("http://localhost:5000/api/offre/" + id);
  }

  addPost(title: string, price: string, date: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("price", price);
    postData.append("date", date);
    postData.append("productImage", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:5000/api/offre",
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/homecompany"]);
      });
      this.router.navigate(["/homecompany"]);
  }

  updatePost(id: string, title: string, price: string, date: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("price", price);
      postData.append("date", date);
      postData.append("productImage", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        price: price,
        date: date,
        image: image,
      };
    }
    this.http
      .put("http://localhost:5000/api/offre/" + id, postData)
      .subscribe(response => {
        this.router.navigate(["/homecompany"]);
      });
      this.router.navigate(["/homecompany"]);
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:5000/api/offre/" + postId);
  }
}
