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
import { Tag } from "../types/Tag";
import { EventSignUp } from "../types/EventSignUp";
import SignUpCard from "./SignUpCard";
import { StrippedEvent, RawEvent } from "../types/Event";
import groupPlaceholder from "../resources/group-placeholder.jpg";
import { useAuthState } from "../AuthContext";
import { useHistory } from "react-router";
import { AdminSlot } from "../types/EventSignUp";
import axios from "axios";

const EventSignUps: React.FC<{
  event?: RawEvent;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
}> = ({ event, setShowModal }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [slots, setSlots] = useState<AdminSlot[]>([]);
  const userDetails = useAuthState();
  const history = useHistory();

  useEffect(() => {
    setIsAdmin(true);
    setTags(testTags);
    fetchEventSlotSignups();
    // setSignUps(testSignUps);
  }, []);

  const fetchEventSlotSignups = () => {
    axios
      .get(`/events/${event?.id}/admin/signups`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const slots = response.data as [AdminSlot];
        setSlots(slots);
      })
      .catch((error) => {});
  };
  // const redirectToGroup = () => {
  //   history.push(`/groups/${event?.group.id}`);
  // };

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
            {/* <IonButton
              slot="end"
              size="small"
              color="secondary"
              fill="outline"
              onClick={redirectToGroup}
            >
              View
            </IonButton> */}
          </div>

          {slots.map((slot) => {
            return (
              <SignUpCard
                isAdmin={isAdmin}
                slot={slot}
                // tagName={slot.tag.tag_name}
                // signUps={slot.filter((signUp) => {
                //   return signUp.tag === tag;
                // })}
              />
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventSignUps;
const tag1 = { tag_id: 1, tag_name: "Junior" };
const tag2 = { tag_id: 2, tag_name: "Senior" };
const testTags = [tag1, tag2];
const signUp1 = {
  userId: 1,
  signup_id: 1,
  signup_date: 1632212361,
  is_signed_up: true,
  is_confirmed: true,
  tag: tag1,
};
const signUp2 = {
  userId: 2,
  signup_id: 2,
  signup_date: 1632212361,
  is_signed_up: false,
  is_confirmed: false,
  tag: tag1,
};
const signUp3 = {
  userId: 3,
  signup_id: 3,
  signup_date: 1632212361,
  is_signed_up: false,
  is_confirmed: true,
  tag: tag2,
};

const testSignUps = [signUp1, signUp2, signUp3];
