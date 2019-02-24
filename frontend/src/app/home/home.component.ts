import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDisabled = false;
  nameIndex = 3;
  zindex;
  animation = '';
  nameList = [
    'anujin',
    'tsenguun',
    'enerelt',
    'shikhi'
  ];
  likedNames = [];
  constructor() { }

  ngOnInit() {
  }
  likeName() {
    this.nameIndex--;
    this.animation = 'fadeOutRight';
    if (this.nameIndex === - 1) {
      this.isDisabled = true;
    } else {
    this.likedNames.push(this.nameList[this.nameIndex]);
    console.log(this.likedNames);
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
