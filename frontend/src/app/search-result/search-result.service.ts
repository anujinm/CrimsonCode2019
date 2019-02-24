import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
const BACKEND_URL = environment.apiUrl + '/search';

@Injectable({
  providedIn: 'root'
})

export class SearchResultService {

  constructor(
    private http: HttpClient
  ) { }

  searchName(name) {
    return this.http.get(BACKEND_URL + '/' + name).toPromise();
  }
}
