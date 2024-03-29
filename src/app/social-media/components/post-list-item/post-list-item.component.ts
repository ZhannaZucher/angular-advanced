import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss',
})
export class PostListItemComponent {
  @Input() post!: Post;
  //on remonte dans l'évent le comment et Id du post commenté au composant parent (post-list) qui est un container et se charge de la comm avec le service
  @Output() postCommented = new EventEmitter<{
    comment: string;
    postId: number;
  }>();
  onNewComment(comment: string) {
    this.postCommented.emit({ comment, postId: this.post.id });
  }
}
