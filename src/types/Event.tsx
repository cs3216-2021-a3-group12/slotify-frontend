/** Event with basic fields */
export interface StrippedEvent {
  id: number;
  title: string;
  start_date_time: number;
  end_date_time: number;
  location: string;
  image_url: string;
}

export type RawEvent = {
  id: number;
  title: string;
  description: string;
  start_date_time: number;
  end_date_time: number;
  location: string;
  image_url: number;
  is_public: boolean;
  group: EventGroupDetails;
};

export type EventGroupDetails = {
  id: number;
  name: string;
  banner_url: string;
};

export type SlotDetails = {
  available_slot_count: number;
  confirmed_signup_count: number;
  is_confirmed: boolean;
  is_eligible: boolean;
  is_signed_up: boolean;
  pending_signup_count: number;
  slot_id: number;
  tag: Tag;
};

export type Tag = {
  tag_name: string;
  tag_id: number;
};
