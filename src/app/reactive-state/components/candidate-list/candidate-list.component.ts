import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
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

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(
      CandidateSearchType.LASTNAME
    );
    this.searchTypeOptions = [
      { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
      { value: CandidateSearchType.LASTNAME, label: 'Nom' },
      { value: CandidateSearchType.COMPANY, label: 'Entreprise' },
    ];
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchType> =
      this.searchTypeCtrl.valueChanges.pipe(
        startWith(this.searchTypeCtrl.value)
      );
    //on combine plsrs observables ensemble:
    //combineLatest émet sous forme de tableau à chaque fois que un des 3 observables émet qch il émet les dernières émissions des 3 observables
    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidatesService.candidates$,
    ]).pipe(
      map(([search, searchType, candidates]) =>
        candidates.filter((candidate) =>
          candidate[searchType].toLowerCase().includes(search as string)
        )
      )
    );
  }
}
