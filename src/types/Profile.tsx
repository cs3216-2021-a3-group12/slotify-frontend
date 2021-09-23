export interface Profile {
  username: string;
  email: string;
  student_number: string;
  nusnet_id: string;
  telegram_handle: string;
}

export const emptyProfile: Profile = {
  username: "",
  email: "",
  student_number: "",
  nusnet_id: "",
  telegram_handle: "",
};
