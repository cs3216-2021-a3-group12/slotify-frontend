/** Event with basic fields */
export interface StrippedEvent {
  id: number;
  title: string;
  description: string;
  start_date_time: number;
  end_date_time: number;
  location: string;
  is_public: boolean;
  group: number;
  image_url?: string;
}
