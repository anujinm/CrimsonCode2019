import {SearchResultModel} from '../search-result/search-result.model';

export class NameSimpleModel {
  id: number;
  name: string;
}


export class NameComplexModel {
  id: number;
  name: string;
  jsonData: SearchResultModel;
}
