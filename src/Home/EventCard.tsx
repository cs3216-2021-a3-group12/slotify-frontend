import {
  IonCard,
  IonContent,
  IonCardHeader,
  IonCardSubtitle,
  IonIcon,
  IonCardTitle,
} from "@ionic/react";
import { timeOutline, locationOutline } from "ionicons/icons";
import { StrippedEvent, Event } from "../types/Event";

function EventCard({ event }: { event: Event }) {
  return (
    <IonCard className="rounded-2xl w-full h-full">
      <div className="w-full h-3/5 flex flex-col items-stretch">
        <img
          className="p-2 w-auto object-fill rounded-2xl"
          alt="Event"
          src={event.image_url || "/resources/event-placeholder.jpg"}
        />
      </div>

      <IonContent className="h-2/5" scrollY={false}>
        <IonCardHeader className="text-left px-2 py-0 truncate">
          <IonCardTitle className="truncate text-base">
            {event.title}
          </IonCardTitle>
          <IonCardSubtitle className="flex items-center">
            <IonIcon icon={timeOutline} className="m-1" />
            {/**TODO: parse using a time management library */}
            <span>{event.start_date_time}</span>
          </IonCardSubtitle>
          <IonCardSubtitle className="flex items-center">
            <IonIcon icon={locationOutline} className="m-1" />
            <span>{event.location}</span>
          </IonCardSubtitle>
        </IonCardHeader>
      </IonContent>
    </IonCard>
  );
}

export default EventCard;
