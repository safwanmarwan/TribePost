import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').subscribe(
      {
        next: (posts) => {
          this.posts = posts;
        }, 
        error: (err: any) => {
          console.log(`Error: ${JSON.stringify(err)}`);
        },
      }
    );
  }

  navigateToPost(postId: number): void {
    this.router.navigate(['../post', postId]);
  }
}
