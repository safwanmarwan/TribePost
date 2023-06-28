import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  public postId: any;
  public post: any;
  public comments: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.getPostDetails();
    });
  }

  getPostDetails(): void {
    console.log(`ID: ${this.postId}`);
    this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      .subscribe(post => {
        this.post = post;
        this.getPostComments();
      });
  }

  getPostComments(): void {
    this.http.get<any[]>(`https://jsonplaceholder.typicode.com/comments?postId=${this.postId}`)
      .subscribe(comments => {
        this.comments = comments;
        comments.forEach((v, i) => {
          console.log(`Comment ${i}: ${v}`);
        })
      });
  }

  navigateBack(): void {
    this.router.navigate(['/'])
  }
}
