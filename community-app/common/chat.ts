import { Comment } from "./comment";
export class Chat {
  comments: Comment[] = null;
  comment: Comment;
  state: string = "initial";
}
