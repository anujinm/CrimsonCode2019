import { Component, OnInit } from '@angular/core';
import {NameComplexModel} from '../home/home.model';
import {ProfileService} from './profile.service';
import {SearchResultModel} from '../search-result/search-result.model';
import {environment} from '../../environments/environment';
// import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  nameOptions = 'anujin';
  chosenName = '';
  chosenContent: SearchResultModel;
  likedNames = ['anujin', 'anna', 'zac'];
  isLoading = false;
  backEndUrl = environment.backendUrl;

  myLikes: NameComplexModel[] = [];

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.profileService.getFavoriteNames().then(res => {
      this.isLoading = false;
      this.myLikes = res;
      this.chosenName = this.myLikes[0].name;
      this.chosenContent = this.myLikes[0].jsonData;
    }).catch(e => console.log(e));
  }

  getStats(name) {
    this.chosenName = name;

    for (let i = 0; i < this.myLikes.length; i++) {
      if (this.myLikes[i].name === name) {
        this.chosenContent = this.myLikes[i].jsonData;
      }
    }

    console.log('getStats clicked!');
  }
}
