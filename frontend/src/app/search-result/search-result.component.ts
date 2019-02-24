import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchResultService} from './search-result.service';
import {SearchResultModel} from './search-result.model';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  isLoading = false;
  result: SearchResultModel;
  backEndUrl = environment.backendUrl;
  name = '';
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchResultService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.isLoading = true;

      if (queryParams['q']) {
        this.searchService.searchName(queryParams['q']).then((res) => {
          this.name = queryParams['q'].toLowerCase();
          this.Capitalize(this.name);
          this.isLoading = false;
          this.result = res;
        }).catch(e => {
          console.log(e);
        });
      }

    });
  }
  Capitalize(name) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
  }

}
