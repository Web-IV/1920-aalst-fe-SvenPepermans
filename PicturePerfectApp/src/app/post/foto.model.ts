export interface FotoJson {
  naam: string;
  url: string;
  base64: string;
}

export class Foto {
  constructor(
    private _naam: string,
    private _url: string,
    private _base64: string
  ) {}

  get naam(): string {
    return this._naam;
  }

  get base64(): string {
    return this._base64;
  }

  get url(): string {
    return this._url;
  }

  static fromJSON(json: FotoJson): Foto {
    const fot = new Foto(json.naam, json.url, json.base64);
    return fot;
  }

  toJSON(): FotoJson {
    return {
      naam: this.naam,
      url: this.url,
      base64: this.base64
    };
  }
}
