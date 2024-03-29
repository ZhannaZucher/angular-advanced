import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../../environments/environment.development';

@Injectable() //comme on charge le module social-media en lazy-loading, on ne crée pas le service avec providedIn: root, sinon il sera chargé au moment du chargement du app module, mais on le déclare(le service) dans le tableau de providers du module social-media
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  addNewComment(postCommented: { comment: string; postId: number }) {
    console.log(postCommented);
  }
}
