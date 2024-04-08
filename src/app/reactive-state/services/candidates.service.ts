import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class CandidatesService {
  constructor(private http: HttpClient) {}

  //variable privée observable qui est un BehaviorSubject du type bool initiée à false par défaut
  //émettra  true  ou  false  selon qu'un chargement est en cours ou non ;
  private _loading$ = new BehaviorSubject<boolean>(false);
  //un getter qui permet de récupérer la valeur du _loading$
  //du coup on peut utiliser this.candidateService.loading comme variable
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  //qui émettra des tableaux de  Candidate
  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  //Appeler  next  sur l'un des BehaviorSubjects du service, c'est s'assurer que tous les components qui sont souscrits à leurs Observables recevront cette nouvelle donnée.
  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }
}
