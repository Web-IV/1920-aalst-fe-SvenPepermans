import { Foto, FotoJson } from './foto.model';
import { User } from '../user/user.model';

interface PostJson {
  postId: number;
  beschrijving: string;
  fotos: FotoJson[];
  categorieNaam: string;
  datePosted: string;
  gebruiker: User;
}

export class Post {
  private _PostId: number;
  constructor(
    private _gebruiker: User,
    private _beschrijving: string,
    private _categorieNaam: string,
    private _fotos = new Array<Foto>(),
    private _datePosted = new Date()
  ) {}

  get gebruiker(): User {
    return this._gebruiker;
  }

  setBeschrijving(value: string) {
    this._beschrijving = value;
  }
  setCategorieNaam(value: string) {
    this._categorieNaam = value;
  }
  setFotos(fotos: Foto[]) {
    this._fotos = fotos;
  }

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

  get PostId(): number {
    return this._PostId;
  }
  static fromJSON(json: PostJson): Post {
    const pos = new Post(
      json.gebruiker,
      json.beschrijving,
      json.categorieNaam,
      json.fotos.map(Foto.fromJSON),
      new Date(json.datePosted)
    );
    pos._PostId = json.postId;
    return pos;
  }

  toJSON(): PostJson {
    return <PostJson>{
      beschrijving: this.beschrijving,
      fotos: this.fotos.map(fot => fot.toJSON()),
      categorieNaam: this.categorieNaam,
      datePosted: this.datePosted.toJSON(),
      gebruiker: this.gebruiker,
      postId: this.PostId
    };
  }
}
