import { useState, useEffect, Fragment } from "react";
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

import { DetailedGroup } from "../types/Group";
import GroupAbout from "./GroupAbout";
import GroupEvents from "./GroupEvents";
import GroupMembers from "./GroupMembers";
import { RouteComponentProps, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "../AuthContext";

interface GroupViewProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const GroupView: React.FC<GroupViewProps> = ({ match }) => {
  const location = useLocation<{ groupId?: string }>();
  const userDetails = useAuthState();
  const [selectedSegment, setSelectedSegment] = useState("about");
  const [group, setGroup] = useState<DetailedGroup | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const fetchGroup = () => {
    axios
      .get(`https://api.slotify.club/api/v1/groups/${match.params.id}/`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
      })
      .then((response) => {
        setGroup(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.response.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGroup();
    // eslint-disable-next-line
  }, [location.state]);

  function changeSegment(e: CustomEvent<SegmentChangeEventDetail>) {
    let value = e.detail.value as string;
    if (value) setSelectedSegment(value);
  }

  return (
    <IonPage>
      {loading ? (
        <p>loading...</p>
      ) : !group ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <Fragment>
          <IonHeader mode="ios" className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start" className="h-10">
                <IonBackButton color="primary" defaultHref="/home" />
              </IonButtons>
            </IonToolbar>
            <IonList className="-mt-12">
              <div>
                <img
                  className="h-56 w-full object-cover"
                  alt="Group Banner"
                  src={
                    group.banner_url
                      ? group.banner_url
                      : "https://api.slotify.club/media/groups/group-default.jpg"
                  }
                />
                <div className="m-4 text-center">
                  <IonLabel className="text-2xl font-bold">
                    {group.name}
                  </IonLabel>
                  <div className="flex flex-row justify-around items-center mt-3">
                    <IonLabel className="font-bold">
                      {group.category.name}
                    </IonLabel>
                    <IonButton
                      size="small"
                      className="w-1/4"
                      href={`https://telegram.me/share/url?url=${window.location.href}&text=Join%20Group!`}
                      target="_blank"
                    >
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
                    <GroupViewSegmentButton
                      value="about"
                      selected={selectedSegment}
                    >
                      ABOUT
                    </GroupViewSegmentButton>
                    <GroupViewSegmentButton
                      value="events"
                      selected={selectedSegment}
                    >
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
          </IonHeader>

          <SegmentPanel value="about" selected={selectedSegment}>
            <GroupAbout group={group} />
          </SegmentPanel>
          <SegmentPanel value="events" selected={selectedSegment}>
            <GroupEvents isAdmin={group.is_admin} groupId={group.id} />
          </SegmentPanel>
          <SegmentPanel value="members" selected={selectedSegment}>
            <GroupMembers group={group} />
          </SegmentPanel>
        </Fragment>
      )}
    </IonPage>
  );
};

export default GroupView;
