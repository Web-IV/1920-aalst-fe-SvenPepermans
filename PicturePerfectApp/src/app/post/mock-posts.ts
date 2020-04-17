import { Post } from './post.model';

const JsonPosts = [
  {
    beschrijving: 'een post',
    fotos: ['1', '2'],
    datePosted: '2020-03-02T18:25:43.511Z'
  }
];
export const POSTS: Post[] = JsonPosts.map(Post.fromJSON);
