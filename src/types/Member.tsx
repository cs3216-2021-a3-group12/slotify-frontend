export interface Member {
  id: number;
  username: string;
  email: string;
  tag: string;
  is_admin: boolean;
  profile: Profile;
}

export interface Profile {
  student_number: string;
  nusnet_id: string;
  telegram_handle: string;
}