import {
  IonPage,
  IonList,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonTitle,
  IonButtons,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonItem,
  IonThumbnail,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonIcon,
  IonChip,
  IonMenuButton,
  IonModal,
} from "@ionic/react";

import { calendarOutline, earthOutline, mapOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import SegmentPanel from "../Components/SegmentPanel";
import { SegmentChangeEventDetail } from "@ionic/core";
import Slot from "./Slot";
import { RouteComponentProps } from "react-router";
import EventSignUps from "./EventSignUps";
import eventPlaceholder from "../resources/event-placeholder.jpg";
import groupPlaceholder from "../resources/group-placeholder.jpg";
import { getTimeDateText } from "./helper";
import { useAuthState } from "../AuthContext";
import { RawEvent, EventGroupDetails, SlotDetails } from "../types/Event";

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const Event: React.FC<UserDetailPageProps> = ({ match, history }) => {
  const [selectedSegment, setSelectedSegment] = useState("signUp");
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState<RawEvent>();
  const [group, setGroup] = useState<EventGroupDetails>();
  const [slots, setSlots] = useState<[SlotDetails]>();
  const userDetails = useAuthState();

  const fetchEvent = () => {
    axios
      .get(`/events/${match.params.id}/`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
      })
      .then((response) => {
        const fetchedEvent = response.data as RawEvent;
        setEvent(fetchedEvent);
        setGroup(fetchedEvent.group);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  const fetchSlots = () => {
    axios
      .get(`/events/${match.params.id}/slots`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
      })
      .then((response) => {
        const fetchedSlots = response.data as [SlotDetails];
        setSlots(fetchedSlots);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  useEffect(() => {
    fetchEvent();
    fetchSlots();
    // eslint-disable-next-line
  }, []);

  function changeSegment(e: CustomEvent<SegmentChangeEventDetail>) {
    let value = e.detail.value as string;
    if (value) setSelectedSegment(value);
  }

  const redirectToGroup = () => {
    history.push(`/groups/${match.params.id}`);
  };

  function getSignupCount(): number {
    if (!slots) {
      return 0;
    }
    const total = slots.reduce((sum, slot) => {
      return sum + slot.confirmed_signup_count;
    }, 0);
    return total;
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border h-40">
        <IonToolbar>
          <IonButtons>
            <IonMenuButton />
            <IonTitle className="text-2xl">Event Details</IonTitle>
          </IonButtons>
        </IonToolbar>
        <img
          alt="Event Banner"
          src={event?.image_url ?? eventPlaceholder}
          className="h-28 w-full object-cover"
        ></img>
        <div className="flex justify-center mx-auto transform -translate-y-1/2 z-50 bg-transparent">
          <IonChip outline={true} className="shadow h-10 bg-white">
            <p className="leading-2">+{getSignupCount()} Going</p>
            {event?.is_admin && (
              <IonButton
                size="small"
                shape="round"
                onClick={() => setShowModal(true)}
                className="pl-2"
              >
                View Signups
              </IonButton>
            )}
          </IonChip>
        </div>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonItem className="text-2xl font-bold pt-10">{event?.title}</IonItem>
          <IonItem>
            <IonThumbnail slot="start">
              <IonImg
                src={group?.banner_url ?? groupPlaceholder}
                alt="group banner"
                className="rounded-md"
              />
            </IonThumbnail>
            <IonGrid>
              <IonRow>
                <IonLabel className="font-bold text-sm">{group?.name}</IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel className="text-xs">Organizing Group</IonLabel>
              </IonRow>
            </IonGrid>
            <IonButton
              slot="end"
              size="small"
              color="primary"
              fill="outline"
              shape="round"
              onClick={redirectToGroup}
            >
              View Group
            </IonButton>
          </IonItem>
          <IonItem>
            <IonIcon icon={calendarOutline} className="pr-3" color="" />
            <IonGrid>
              <IonRow>
                <IonLabel>
                  {event
                    ? getTimeDateText(
                        event.start_date_time,
                        event.end_date_time
                      )
                    : ""}
                </IonLabel>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItem>
            <IonIcon icon={mapOutline} className="pr-3" />
            <IonLabel>{event?.location}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={earthOutline} className="pr-3" />
            <IonLabel>
              {event?.is_public ? "Public Event" : "Private Event"}
            </IonLabel>
          </IonItem>
        </IonList>
        <IonSegment
          mode="ios"
          value={selectedSegment}
          onIonChange={changeSegment}
          color="primary-contrast"
        >
          <IonSegmentButton value="signUp">
            <IonLabel>Sign Up</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="about">
            <IonLabel>About</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <SegmentPanel value="signUp" selected={selectedSegment}>
          <IonList lines="none">
            <IonItem>
              <p className="text-sm text-gray-500 italic">
                Note that you can only join one slot. If there are no slots
                left, you can join the waitlist, and will be automatically
                registered if a slot becomes available.
              </p>
            </IonItem>
            {slots ? (
              slots.map((slot) => (
                <Slot slotDetails={slot} key={slot.slot_id} />
              ))
            ) : (
              <IonLabel></IonLabel>
            )}
          </IonList>
        </SegmentPanel>
        <SegmentPanel value="about" selected={selectedSegment}>
          <IonList lines="none">
            <IonItem>{event?.description}</IonItem>
          </IonList>
        </SegmentPanel>
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          swipeToClose={true}
        >
          <EventSignUps event={event} setShowModal={setShowModal} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Event;
