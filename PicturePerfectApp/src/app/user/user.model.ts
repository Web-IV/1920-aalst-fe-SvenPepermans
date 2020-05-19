import { Foto } from './../post/foto.model';
import { Post } from '../post/post.model';

interface UserJson {
  gebruikersId: number;
  voornaam: string;
  achternaam: string;
  gebruikersnaam: string;
  email: string;
  posts: Post[];
  fotos: Foto[];
}

export class User {
  private _gebruikersId: number;
  constructor(
    private _voornaam: string,
    private _achternaam: string,
    private _gebruikersnaam: string,
    private _email: string,
    private _posts: Post[],
    private _fotos: Foto[]
  ) {}

  get gebruikersId(): number {
    return this._gebruikersId;
  }

  get voornaam(): string {
    return this._voornaam;
  }

  get achternaam(): string {
    return this._achternaam;
  }

  get gebruikersnaam(): string {
    return this._gebruikersnaam;
  }

  get email(): string {
    return this._email;
  }

  get posts(): Post[] {
    return this._posts;
  }

  get fotos(): Foto[] {
    return this._fotos;
  }

  static fromJSON(json: UserJson): User {
    const user = new User(
      json.voornaam,
      json.achternaam,
      json.gebruikersnaam,
      json.email,
      json.posts,
      json.fotos
    );
    user._gebruikersId = json.gebruikersId;
    return user;
  }
}
