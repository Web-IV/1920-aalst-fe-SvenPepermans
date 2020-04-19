export interface FotoJson {
  naam: string;
  url: string;
}

export class Foto {
  constructor(private _naam: string, private _url: string) {}

  get naam(): string {
    return this._naam;
  }

  get url(): string {
    return this._url;
  }

  static fromJSON(json: FotoJson): Foto {
    const fot = new Foto(json.naam, json.url);
    return fot;
  }

  toJSON(): FotoJson {
    return {
      naam: this.naam,
      url: this.url
    };
  }
}
