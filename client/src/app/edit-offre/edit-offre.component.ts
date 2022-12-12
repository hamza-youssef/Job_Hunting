import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NgForm } from "@angular/forms";
import { PostsService } from "../Product/posts.service";
import { Post } from "../Product/post.model";
import { mimeType } from "../add-offre/mime-type.validator";

@Component({
  selector: 'app-edit-offre',
  templateUrl: './edit-offre.component.html',
  styleUrls: ['./edit-offre.component.css']
})
export class EditOffreComponent implements OnInit {

  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  file: File=null; // Variable to store file
  private mode = "create";
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      date: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    console.log("first")
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log("ID :",paramMap.get("postId"))

      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;

        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          console.log("postData: ",postData)
          this.post = {
            id: postData._id,
            title: postData.title,
            price: postData.price,
            date: postData.date,
            image: postData.image,
          };
          this.form.setValue({
            title: this.post.title,
            price: this.post.price,
            date: this.post.date,
            image: this.post.image
          });
        });
      }
    });
  }


  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(this.postId)
    console.log(this.form.value.title)
    console.log(this.form.value.price)
    console.log(this.form.value.date)

      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.price,
        this.form.value.date,
        this.file
      );

  }

}
