
export class Img {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
}
export class Microsources {
  microsource: any;
}

export class Datasources {
  datasource: string;
}

export class Subpod {
  title: string;
  img: Img;
  plaintext: string;
  microsources: Microsources;
  datasources: Datasources;
}

export class State {
  name: string;
  input: string;
}

export class Pod {
  title: string;
  scanner: string;
  id: string;
  position: number;
  error: boolean;
  numsubpods: number;
  subpods: Subpod[];
  states: State[];
}

export class Value {
  name: string;
  word: string;
  desc: string;
  input: string;
}

export class Assumption {
  type: string;
  word: string;
  template: string;
  count: number;
  values: Value[];
}

export class Source {
  url: string;
  text: string;
}

export class SearchResultModel {
  success: boolean;
  error: boolean;
  numpods: number;
  datatypes: string;
  timedout: string;
  timedoutpods: string;
  timing: number;
  parsetiming: number;
  parsetimedout: boolean;
  recalculate: string;
  id: string;
  host: string;
  server: string;
  related: string;
  version: string;
  pods: Pod[];
  assumptions: Assumption[];
  sources: Source[];
}
