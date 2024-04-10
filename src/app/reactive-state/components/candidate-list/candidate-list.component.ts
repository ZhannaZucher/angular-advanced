import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateListComponent implements OnInit {
  //observables locaux
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  //search variables
  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl; //recherche par nom/prénom/entreprise
  searchTypeOptions!: {
    value: CandidateSearchType;
    label: string;
  }[];

  constructor(
    private candidatesService: CandidatesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.candidatesService.getCandidatesFromServer();
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    this.candidates$ = this.candidatesService.candidates$;
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(
      CandidateSearchType.LASTNAME
    );
    this.searchTypeOptions = [
      { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
      { value: CandidateSearchType.FIRSTNAME, label: 'Nom' },
      { value: CandidateSearchType.COMPANY, label: 'Entreprise' },
    ];
  }
}
