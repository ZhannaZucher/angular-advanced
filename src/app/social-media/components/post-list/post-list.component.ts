import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(map((data) => data['posts']));
  }
}
