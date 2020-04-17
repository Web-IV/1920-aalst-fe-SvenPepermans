interface PostJson{
    beschrijving: string;
    fotos: string[];
    datePosted: string;
}

export class Post{
    constructor(
        private _beschrijving: string,
        private _fotos = new Array<string>(),
        private _datePosted = new Date()
    ){}

    static fromJSON(json: PostJson): Post {
        const rec = new Post(json.beschrijving, json.fotos, new Date(json.datePosted));
        return rec;
    }
}