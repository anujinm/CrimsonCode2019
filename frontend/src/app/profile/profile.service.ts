import { Injectable } from '@angular/core';
import {NameSimpleModel} from '../home/home.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BACKEND_URL_Like = environment.apiUrl + '/like';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }



  getRandomNames() {
    return this.http.get<NameSimpleModel[]>(BACKEND_URL_Like).toPromise();
  }
}
