import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SearchResultModel} from "./search-result.model";
const BACKEND_URL = environment.apiUrl + '/search';

@Injectable({
  providedIn: 'root'
})

export class SearchResultService {

  constructor(
    private http: HttpClient
  ) { }

  searchName(name, target) {
    return this.http.get<SearchResultModel>(BACKEND_URL + '/' + name + '?target=' + target).toPromise();
  }
}
