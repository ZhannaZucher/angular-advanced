import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  //Input récupère info depuis parent
  //Output transmet l'info(event) au parent
  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>(); //on initialise directement avec un objet qui émet des events
  commentCtrl!: FormControl;

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
}
