import { IonCard, IonCardHeader, IonIcon, IonCardTitle } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { StrippedEvent } from "../types/Event";
import eventPlaceholder from "../resources/event-placeholder.jpg";
import moment from "moment";

function EventCard({ event }: { event: StrippedEvent }) {
  function getTimeDateText(event: StrippedEvent) {
    const start = new Date(event.start_date_time);
    const end = new Date(event.end_date_time);
    const startMoment = moment(start);
    const endMoment = moment(end);

    if (
      start.getDate() === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${startMoment.format("DD MMM")} | ${startMoment.format(
        "H:mmA"
      )} - ${endMoment.format("H:mmA")}`;
    }
    return `${startMoment.format("DD MMM H:mmA")} - ${endMoment.format(
      "DD MMM H:mmA"
    )}`;
  }

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
          <span className="my-1 text-indigo-500">{getTimeDateText(event)}</span>
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
