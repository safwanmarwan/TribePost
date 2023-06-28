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
  public filteredComments: any;
  public filteredEmails: any;
  public selectedComment: any;
  public inputSearchValue: any;

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

  onInputChange(): void {
    // Your logic here
    this.filterComments(this.inputSearchValue);
  }

  getPostDetails(): void {
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
        this.filteredComments = this.comments;
      });
  }

  filterComments(event: any): void {
    const query = event.toLowerCase();
    this.filteredComments = this.comments.filter((comment: any) => 
      comment.name.toLowerCase().includes(query) || 
      comment.email.toLowerCase().includes(query) || 
      comment.body.toLowerCase().includes(query)
    );
  }

  navigateBack(): void {
    this.router.navigate(['/'])
  }
}
