import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Observable } from 'rxjs';

export const PostsResolver: ResolveFn<Post[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Post[]> => {
  return inject(PostsService).getPosts();
};
