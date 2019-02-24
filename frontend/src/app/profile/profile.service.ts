import { Injectable } from '@angular/core';
import {NameComplexModel} from '../home/home.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BACKEND_URL_LIKE = environment.apiUrl + '/like';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  getFavoriteNames() {
    return this.http.get<NameComplexModel[]>(BACKEND_URL_LIKE).toPromise();
  }
}
