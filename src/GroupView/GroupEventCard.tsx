import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { timeOutline, locationOutline } from "ionicons/icons";
import { StrippedEvent } from "../types/Event";

function GroupEventCard({ event }: { event: StrippedEvent }) {
  return (
    <IonCard className="rounded-2xl mx-5 flex">
      <div className="h-full w-1/3">
        <img
          className="h-full w-full p-2 object-fill rounded-2xl"
          alt="Group"
          src={event.imgUrl}
        />
      </div>

      <div className="w-2/3 flex flex-col justify-center p-3">
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

export default GroupEventCard;
