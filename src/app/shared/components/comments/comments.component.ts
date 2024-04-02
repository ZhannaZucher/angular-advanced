import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  animate,
  group,
  query,
  sequence,
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
      transition('void => *', [
        query('.comment-text, .comment-date', [
          style({
            opacity: 0,
          }),
        ]),
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          'background-color': 'rgb(201, 157, 242)',
        }),
        animate(
          '300ms ease-out',
          style({
            transform: 'translateX(0)',
            opacity: 1,
            'background-color': 'white',
          })
        ),
        group([
          // sequence([
          //   animate(
          //     '250ms',
          //     style({
          //       'background-color': 'rgb(255, 7, 147)',
          //     })
          //   ),
          //   animate(
          //     '250ms',
          //     style({
          //       'background-color': 'white',
          //     })
          //   ),
          // ]),
          query('.comment-text', [
            animate(
              '250ms',
              style({
                opacity: 1,
              })
            ),
          ]),
          query('.comment-date', [
            animate(
              '500ms',
              style({
                opacity: 1,
              })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class CommentsComponent implements OnInit {
  //Input récupère info depuis parent
  //Output transmet l'info(event) au parent
  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>(); //on initialise directement avec un objet qui émet des events
  commentCtrl!: FormControl;

  //on crée ici un objet dictionnaire qui associe clés de l'objet (key de chaque élément du tableau) à la valeur du state qui lui correspond
  //cet objet est vide, on initialise dans ngOnInit
  animationStates: { [key: number]: 'default' | 'active' } = {};
  //on crée une var avec 2 types d'état possible et on lui attribue la valeur par défaut
  // listItemAnimationState: 'default' | 'active' = 'default';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //control génère un contrôle à la fois et prend les args : état par défault(string vide), array de validators
    this.commentCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]);
    //on initalise l'objet de states à partir des index du tableau des comments
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }
  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    } else {
      //on ajoute new comment au début du tableau des comments pour animer son arrivée par la suite
      const maxId = Math.max(...this.comments.map((comment) => comment.id));
      this.comments.unshift({
        id: maxId + 1,
        comment: this.commentCtrl.value,
        createdDate: new Date().toISOString(),
        userId: 1,
      });
      //si input est valide on émet sa value via EventEmitter au composant parent et on reset l'input
      this.newComment.emit(this.commentCtrl.value);
      this.commentCtrl.reset();
    }
  }

  //animations handling methods
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }
  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
}
