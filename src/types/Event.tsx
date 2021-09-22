/** Event with basic fields */

export const ID = "id";
export const DESCRIPTION = "description";
export const TITLE = "title";
export const START_DATE_TIME = "start_date_time";
export const END_DATE_TIME = "end_date_time";
export const LOCATION = "location";
export const IS_PUBLIC = "is_public";
export const IMAGE_URL = "image_url";

export const SIGNUP = "signup";
export const SIGNUP_ID = "signup_id";
export const SIGNUP_DATE = "signup_date";
export const IS_CONFIRMED = "is_confirmed";
export const HAS_ATTENDED = "has_attended";

export const SLOT = "slot";
export const SLOT_ID = "slot_id";
export const TAG = "tag";
export const TAG_NAME = "tag_name";
export const TAG_ID = "tag_id";

export type Event = {
  [ID]: number;
  [TITLE]: string;
  [DESCRIPTION]: string;
  [START_DATE_TIME]: number;
  [END_DATE_TIME]: number;
  [LOCATION]: string;
  [IS_PUBLIC]: boolean;
  [SIGNUP]: SignUp;
  [IMAGE_URL]: string;
};

export type SignUp = {
  [SIGNUP_ID]: number;
  [SIGNUP_DATE]: number;
  [IS_CONFIRMED]: boolean;
  [HAS_ATTENDED]: boolean;
  [SLOT]: Slot;
};

export type Slot = {
  [SLOT_ID]: number;
  [TAG]: {
    [TAG_ID]: number;
    [TAG_NAME]: string;
  };
};

export interface StrippedEvent {
  id: number;
  title: string;
  start_date_time: number;
  end_date_time: number;
  location: string;
  image_url: string;
}
