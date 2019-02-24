import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchResultService} from './search-result.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  isLoading = false;
  nameData = {};
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchResultService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.isLoading = true;

      if (queryParams['q']) {
        this.searchService.searchName(queryParams['q']).then((res) => {
          this.isLoading = false;
          this.nameData = res;
        }).catch(e => {
          console.log(e);
        });
      }

    });
  }

}
