import { useState, useEffect } from "react";
import {
  IonPage,
  IonSegment,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
} from "@ionic/react";
import { SegmentChangeEventDetail } from "@ionic/core";

import SegmentPanel from "../Components/SegmentPanel";
import GroupViewSegmentButton from "./GroupViewSegmentButton";

import "./GroupView.css";
import { DetailedGroup } from "../types/Group";
import GroupAbout from "./GroupAbout";
import GroupEvents from "./GroupEvents";
import GroupMembers from "./GroupMembers";
import { RouteComponentProps } from "react-router-dom";

interface GroupViewProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const GroupView: React.FC<GroupViewProps> = ({ match }) => {
  const id = Number(match.params.id);
  const [selectedSegment, setSelectedSegment] = useState("about");
  const [group, setGroup] = useState<DetailedGroup | undefined>(undefined);

  useEffect(() => {
    fetch(`https://api.slotify.club/api/v1/groups/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id === id) {
          setGroup(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  function changeSegment(e: CustomEvent<SegmentChangeEventDetail>) {
    let value = e.detail.value as string;
    if (value) setSelectedSegment(value);
  }

  if (!group) {
    return (
      <IonPage>
        <IonHeader mode="ios" translucent={true} className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start" className="h-10">
              <IonBackButton color="primary" defaultHref="/home" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="w-full h-full flex items-center justify-center">
            <IonLabel className="text-lg text-gray-400">
              No group found.
            </IonLabel>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader mode="ios" translucent={true} className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start" className="h-10">
            <IonBackButton color="primary" defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonList className=" -mt-10">
        <div>
          <div className=" h-40">
            <img
              className="h-full w-full object-cover "
              alt="Group Banner"
              src={group.banner_url}
            />
          </div>

          <div className="m-4 text-center">
            <IonLabel className="text-2xl font-bold">{group.name}</IonLabel>
            <div className="flex flex-row justify-around items-center mt-3">
              <IonLabel className="font-bold">{group.category.name}</IonLabel>
              <IonButton size="small" className="w-1/4">
                Share
              </IonButton>
            </div>
          </div>
          <div className="px-3">
            <IonSegment
              mode="ios"
              value={selectedSegment}
              onIonChange={changeSegment}
            >
              <GroupViewSegmentButton value="about" selected={selectedSegment}>
                ABOUT
              </GroupViewSegmentButton>
              <GroupViewSegmentButton value="events" selected={selectedSegment}>
                EVENTS
              </GroupViewSegmentButton>
              <GroupViewSegmentButton
                value="members"
                selected={selectedSegment}
              >
                MEMBERS
              </GroupViewSegmentButton>
            </IonSegment>
          </div>
        </div>
      </IonList>
      <SegmentPanel value="about" selected={selectedSegment}>
        <GroupAbout group={group} />
      </SegmentPanel>
      <SegmentPanel value="events" selected={selectedSegment}>
        <GroupEvents groupId={group.id} />
      </SegmentPanel>
      <SegmentPanel value="members" selected={selectedSegment}>
        <GroupMembers />
      </SegmentPanel>
    </IonPage>
  );
};

export default GroupView;
