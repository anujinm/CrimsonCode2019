import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {NameSimpleModel} from './home.model';
const BACKEND_URL_LIKE = environment.apiUrl + '/like';
const BACKEND_URL_NAME = environment.apiUrl + '/name';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  likeName(UserId, PeopleNameId) {
    const body = {UserId, PeopleNameId};
    return this.http.post(BACKEND_URL_LIKE + '/assign', body).toPromise();
  }

  getRandomNames() {
    return this.http.get<NameSimpleModel[]>(BACKEND_URL_NAME + '/random').toPromise();
  }
}
