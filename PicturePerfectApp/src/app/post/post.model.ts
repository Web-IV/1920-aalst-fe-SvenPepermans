import { Foto, FotoJson } from './foto.model';

interface PostJson {
  beschrijving: string;
  fotos: FotoJson[];
  datePosted: string;
}

export class Post {
  constructor(
    private _beschrijving: string,
    private _fotos = new Array<Foto>(),
    private _datePosted = new Date()
  ) {}

  get beschrijving(): string {
    return this._beschrijving;
  }
  get fotos(): Foto[] {
    return this._fotos;
  }
  get datePosted(): Date {
    return this._datePosted;
  }
  static fromJSON(json: PostJson): Post {
    const pos = new Post(
      json.beschrijving,
      json.fotos.map(Foto.fromJSON),
      new Date(json.datePosted)
    );
    return pos;
  }

  toJSON(): PostJson {
    return <PostJson>{
      beschrijving: this.beschrijving,
      fotos: this.fotos.map(fot => fot.toJSON()),
      datePosted: this.datePosted.toString()
    };
  }
}
