interface PostJson {
  beschrijving: string;
  fotos: string[];
  datePosted: string;
}

export class Post {
  constructor(
    private _beschrijving: string,
    private _fotos = new Array<string>(),
    private _datePosted = new Date()
  ) {}

  get beschrijving(): string {
    return this._beschrijving;
  }
  get foto(): string[] {
    return this._fotos;
  }
  get datePosted(): Date {
    return this._datePosted;
  }
  static fromJSON(json: PostJson): Post {
    const pos = new Post(
      json.beschrijving,
      json.fotos,
      new Date(json.datePosted)
    );
    return pos;
  }
}
