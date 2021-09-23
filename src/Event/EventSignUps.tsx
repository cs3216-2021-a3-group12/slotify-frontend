import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonTitle,
  IonThumbnail,
  IonImg,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import SignUpCard from "./SignUpCard";
import { RawEvent } from "../types/Event";
import groupPlaceholder from "../resources/group-placeholder.jpg";
import { useAuthState } from "../AuthContext";
import { AdminSlot } from "../types/EventSignUp";
import axios from "axios";

const EventSignUps: React.FC<{
  event?: RawEvent;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
}> = ({ event, setShowModal }) => {
  const [slots, setSlots] = useState<AdminSlot[]>([]);
  const userDetails = useAuthState();

  useEffect(() => {
    fetchEventSlotSignups();
    // eslint-disable-next-line
  }, []);

  const fetchEventSlotSignups = () => {
    axios
      .get(`/events/${event?.id}/admin/signups`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
      })
      .then((response) => {
        const slots = response.data as [AdminSlot];
        setSlots(slots);
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border mb-5">
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton
              color="primary"
              fill="clear"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Event Sign Ups</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="text-left">
        <div className="flex flex-col gap-6">
          <IonLabel className="text-2xl font-bold truncate px-5">
            {event?.title}
          </IonLabel>
          <div className="flex justify-between px-6">
            <IonThumbnail slot="start">
              <IonImg
                src={event?.group.banner_url ?? groupPlaceholder}
                alt="group banner"
                className="rounded-md"
              />
            </IonThumbnail>
            <IonGrid>
              <IonRow>
                <IonLabel className="font-bold text-sm">
                  {event?.group.name}
                </IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel className="text-xs">Organizing Group</IonLabel>
              </IonRow>
            </IonGrid>
          </div>

          {slots.map((slot) => {
            return <SignUpCard slot={slot} />;
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventSignUps;
