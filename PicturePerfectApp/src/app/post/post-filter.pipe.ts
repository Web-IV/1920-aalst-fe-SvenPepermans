import { Post } from './post.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postFilter'
})
export class PostFilterPipe implements PipeTransform {
  transform(posts: Post[], beschrijving: string): Post[] {
    if (!beschrijving || beschrijving.length === 0) {
      return posts;
    }
    return posts.filter(pos =>
      pos.beschrijving.toLowerCase().startsWith(beschrijving.toLowerCase())
    );
  }
}
