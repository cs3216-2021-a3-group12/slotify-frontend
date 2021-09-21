import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonIcon,
  IonCardTitle,
} from "@ionic/react";
import { timeOutline, locationOutline } from "ionicons/icons";
import { StrippedEvent } from "../types/Event";

function EventCard({ event }: { event: StrippedEvent }) {
  return (
    <IonCard
      className="rounded-2xl w-full h-full"
      routerLink={`/events/${event.id}`}
    >
      <div className="flex flex-col items-stretch">
        <img
          className="p-2 w-auto object-fill rounded-2xl"
          alt="Event"
          src={event.imgUrl}
        />
        <IonCardHeader className="text-left px-2 py-0 truncate">
          <IonCardTitle className="truncate text-base">
            {event.name}
          </IonCardTitle>
          <IonCardSubtitle className="flex items-center">
            <IonIcon icon={timeOutline} className="m-1" />
            <span>{event.datetime}</span>
          </IonCardSubtitle>
          <IonCardSubtitle className="flex items-center">
            <IonIcon icon={locationOutline} className="m-1" />
            <span>{event.location}</span>
          </IonCardSubtitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
}

export default EventCard;
