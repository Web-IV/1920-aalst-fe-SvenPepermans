import { Foto, FotoJson } from './foto.model';

interface PostJson {
  id: number;
  beschrijving: string;
  fotos: FotoJson[];
  categorieNaam: string;
  datePosted: string;
}

export class Post {
  private _id: number;
  constructor(
    private _beschrijving: string,
    private _categorieNaam: string,
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

  get categorieNaam(): string {
    return this._categorieNaam;
  }

  get id(): number {
    return this._id;
  }
  static fromJSON(json: PostJson): Post {
    const pos = new Post(
      json.beschrijving,
      json.categorieNaam,
      json.fotos.map(Foto.fromJSON),
      new Date(json.datePosted)
    );
    pos._id = json.id;
    return pos;
  }

  toJSON(): PostJson {
    return <PostJson>{
      beschrijving: this.beschrijving,
      fotos: this.fotos.map(fot => fot.toJSON()),
      categorieNaam: this.categorieNaam,
      datePosted: this.datePosted.toString()
    };
  }
}
