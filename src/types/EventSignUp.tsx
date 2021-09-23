import { Tag } from "./Tag";
import { User } from "./User";

export interface EventSignUp {
  userId: number;
  signup_id: number;
  signup_date: number;
  is_signed_up: boolean;
  is_confirmed: boolean;
  tag: Tag;
}

export type AdminSlot = {
  tag: Tag;
  slot_id: number;
  confirmed_signup_count: number;
  pending_signup_count: number;
  available_slot_count: number;
  signups: {
    confirmed_signups: [AdminSignup];
    pending_signups: [AdminSignup];
  };
};

export type AdminSignup = {
  signup_id: number;
  signup_date: number;
  is_confirmed: boolean;
  has_attended: boolean;
  user: User;
};
