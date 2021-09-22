import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonIcon,
  IonCardTitle,
} from "@ionic/react";
import { timeOutline, locationOutline } from "ionicons/icons";
import { StrippedEvent } from "../types/Event";
import eventPlaceholder from "../resources/event-placeholder.jpg";

function EventCard({ event }: { event: StrippedEvent }) {
  return (
    <IonCard className="rounded-2xl w-full h-full">
      <div className="flex flex-col">
        <div className="h-2/3 w-full">
          <img
            className="p-2 w-auto h-full object-fill rounded-2xl"
            alt="Event"
            src={event.image_url || eventPlaceholder}
          />
        </div>
        <IonCardHeader className="text-left px-2 py-0 truncate">
          <IonCardTitle className="truncate text-base">
            {event.title}
          </IonCardTitle>
          <IonCardSubtitle className="flex items-center m-0">
            <IonIcon icon={timeOutline} className="m-1" />
            <span>{event.end_date_time}</span>
          </IonCardSubtitle>
          <IonCardSubtitle className="flex items-center m-0">
            <IonIcon icon={locationOutline} className="m-1" />
            <span>{event.location}</span>
          </IonCardSubtitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
}

export default EventCard;
