import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";

import { StrippedEvent } from "../types/Event";
import eventPlaceholder from "../resources/event-placeholder.jpg";
import { getTimeDateText } from "../Event/helper";

function GroupEventCard({ event }: { event: StrippedEvent }) {
  return (
    <IonCard className="rounded-2xl w-auto h-32 m-3 flex justify-between">
      <div className="h-full w-1/3">
        <img
          className="h-full w-full p-2 object-cover rounded-2xl"
          alt="Group"
          src={event.image_url ?? eventPlaceholder}
        />
      </div>

      <div className="w-2/3 flex flex-col justify-center p-3">
        <IonCardContent className="text-left p-0">
          <p className="text-indigo-500 text-base sm:text-xs md:text-sm">
            {getTimeDateText(event.start_date_time, event.end_date_time)}
          </p>
        </IonCardContent>
        <IonCardHeader className="w-full text-left p-0">
          <IonCardTitle className="text-lg sm:text-base leading-1 line-clamp-2">
            {event.title}
          </IonCardTitle>
          <IonCardSubtitle className="flex items-center m-0">
            <IonIcon icon={locationOutline} size="small" className="my-2" />
            {event.location}
          </IonCardSubtitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
}

export default GroupEventCard;
