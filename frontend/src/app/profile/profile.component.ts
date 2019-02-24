import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  nameOptions = 'anujin';
  chosenName = 'anujin';
  likedNames = ['anujin', 'anna', 'zac'];
  constructor() { }

  ngOnInit() {
  }
  getStats(name) {
    this.chosenName = name;
    console.log('getStats clicked!');
  }
}
