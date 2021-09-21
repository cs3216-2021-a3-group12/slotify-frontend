import { Tag } from "./Tag";
export interface EventSignUp {
  userId: number;
  signup_id: number;
  signup_date: number;
  is_signed_up: boolean;
  is_confirmed: boolean;
  tag: Tag;
}
