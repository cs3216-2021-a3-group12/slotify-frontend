import { IonCard, IonCardHeader, IonIcon, IonCardTitle } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { StrippedEvent } from "../types/Event";
import eventPlaceholder from "../resources/event-placeholder.jpg";
import { getTimeDateText } from "../Event/helper";

function EventCard({ event }: { event: StrippedEvent }) {
  return (
    <IonCard className="rounded-2xl w-full h-full m-0">
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
          <span className="my-1 text-indigo-500">
            {getTimeDateText(event.start_date_time, event.end_date_time)}
          </span>
          <div className="flex items-center m-0">
            <IonIcon icon={locationOutline} className="my-1" size="small" />
            <span>{event.location}</span>
          </div>
        </IonCardHeader>
      </div>
    </IonCard>
  );
}

export default EventCard;
