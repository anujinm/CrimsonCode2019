import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import {NameSimpleModel} from './home.model';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDisabled = false;
  nameIndex = 0;
  animation = '';
  // nameList = [
  //   'anujin',
  //   'tsenguun',
  //   'enerelt',
  //   'shikhi'
  // ];
  userId = 0;
  isLoading = false;
  names: NameSimpleModel[] = [];
  constructor(
    private homeService: HomeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.isLoading = true;
    this.homeService.getRandomNames().then(res => {
      this.names = res;
      this.isLoading = false;
      this.nameIndex = this.names.length - 1;
    }).catch(e => {
      console.log(e);
    });
  }
  likeName() {
    this.homeService.likeName(this.userId, this.names[this.nameIndex].id).then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    });

    this.nameIndex--;
    this.animation = 'fadeOutRight';
    if (this.nameIndex === - 1) {
      this.isDisabled = true;
    }
  }
  dislikeName() {
    this.animation = 'fadeOutLeft';
    this.nameIndex--;
    if (this.nameIndex === -1) {
      this.isDisabled = true;
    }
  }
  // dislike(index)  {
  //   this.nameIndex += 1;
  //   if (index === this.nameList.length - 1) {
  //     this.isDisabled = true;
  //   } else {
  //   }
  //   return () => {
  //     alert('hello');
  //   };
  // }
}
