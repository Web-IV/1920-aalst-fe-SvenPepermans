import { Foto } from './../post/foto.model';
import { Post } from "../post/post.model";

interface UserJson{
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    posts: Post[];
    fotos: Foto[];

}

export class User{
    constructor(
        private _userId: number,
        private _firstName: string,
        private _lastName: string,
        private _userName: string,
        private _email: string,
        private _posts: Post[],
        private _fotos: Foto[]
    ){}

    get userId(): number {
        return this._userId;
      }

    get firstName(): string {
        return this._firstName;
      }

    get lastName(): string {
        return this._lastName;
      }
    
    get userName(): string {
        return this._userName;
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
            json.userId,
            json.firstName,
            json.lastName,
            json.userName,
            json.email,
            json.posts,
            json.fotos
            );
        return user;
      }
}