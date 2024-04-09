import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, tap } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { environment } from '../../../environments/environment.development';

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

  private lastLoad = 0;

  //Appeler  next  sur l'un des BehaviorSubjects du service, c'est s'assurer que tous les components qui sont souscrits à leurs Observables recevront cette nouvelle donnée.
  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  //la requête va hydrater le tableau candidates$
  getCandidatesFromServer() {
    //si le dernier fetch de data date de moins de 5 min on ne fait rien
    if (Date.now() - this.lastLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    //ici on ne souscrit pas à un Observable car le component est déjà souscrit avec la méthode get candidates$()
    this.http
      .get<Candidate[]>(`${environment.apiUrl}/candidates`)
      .pipe(
        delay(1000), //on simule le temps de réponse du server pour le loader
        tap((candidates) => {
          this.lastLoad = Date.now();
          this._candidates$.next(candidates);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  getCandidateById(id: number): Observable<Candidate> {
    if (!this.lastLoad) {
      this.getCandidatesFromServer();
    }
    return this.candidates$.pipe(
      map(
        (candidates) => candidates.filter((candidate) => candidate.id === id)[0]
      )
    );
  }
}
