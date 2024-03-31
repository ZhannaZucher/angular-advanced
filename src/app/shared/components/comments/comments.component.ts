import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  animations: [
    trigger('listItem', [
      state(
        'default',
        style({
          transform: 'scale(1)',
          backgroundColor: 'white',
          zIndex: 1,
        })
      ),
      state(
        'active',
        style({
          transform: 'scale(1.05)',
          'background-color': 'rgb(201, 157, 242)',
          'z-index': 2,
        })
      ),
      transition('default => active', [animate('100ms ease-in-out')]),
      transition('active => default', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class CommentsComponent implements OnInit {
  //Input récupère info depuis parent
  //Output transmet l'info(event) au parent
  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>(); //on initialise directement avec un objet qui émet des events
  commentCtrl!: FormControl;
  //on crée une var avec 2 types d'état possible et on lui attribue la valeur par défaut
  listItemAnimationState: 'default' | 'active' = 'default';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //control génère un contrôle à la fois et prend les args : état par défault(string vide), array de validators
    this.commentCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]);
  }
  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    } else {
      //si input est valide on émet sa value via EventEmitter au composant parent et on reset l'input
      this.newComment.emit(this.commentCtrl.value);
      this.commentCtrl.reset();
    }
  }

  //animations handling methods
  onListItemMouseEnter() {
    this.listItemAnimationState = 'active';
  }
  onListItemMouseLeave() {
    this.listItemAnimationState = 'default';
  }
}
