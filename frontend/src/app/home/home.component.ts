import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDisabled = false;
  nameIndex = 0;
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
  likeName(index) {
    this.nameIndex += 1;

    if (index === this.nameList.length - 1) {
      this.isDisabled = true;
    } else {
    this.likedNames.push(this.nameList[index]);
    console.log(this.likedNames);
    }
  }
  dislikeName(index) {
    this.nameIndex += 1;

    if (index === this.nameList.length - 1) {
      this.isDisabled = true;
    } else {
    }
  }
}
