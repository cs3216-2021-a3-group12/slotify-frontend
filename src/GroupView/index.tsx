import { useState, useEffect } from "react";
import {
  IonTitle,
  IonToolbar,
  IonPage,
  IonHeader,
  IonSegment,
  IonBackButton,
} from "@ionic/react";
import { SegmentChangeEventDetail } from "@ionic/core";

import { MenuButton } from "../Components/SideMenu";
import SegmentPanel from "../Components/SegmentPanel";
import GroupViewSegmentButton from "./GroupViewSegmentButton";

import "./GroupView.css";
import { StrippedGroup } from "../types/Group";

function GroupView() {
  const [selectedSegment, setSelectedSegment] = useState("about");
  const [group, setGroup] = useState<StrippedGroup>(testGroup);

  useEffect(() => {
    setGroup(testGroup);
  }, []);

  function changeSegment(e: CustomEvent<SegmentChangeEventDetail>) {
    let value = e.detail.value as string;
    if (value) setSelectedSegment(value);
  }

  return (
    <IonPage id="main">
      <IonBackButton />
      <img className="group-banner-img" alt="Group Banner" src={group.imgUrl} />
      <div>
        <IonSegment
          mode="ios"
          className="group-view-segment"
          value={selectedSegment}
          onIonChange={changeSegment}
        >
          <GroupViewSegmentButton value="about" selected={selectedSegment}>
            ABOUT
          </GroupViewSegmentButton>
          <GroupViewSegmentButton value="events" selected={selectedSegment}>
            EVENTS
          </GroupViewSegmentButton>
          <GroupViewSegmentButton value="members" selected={selectedSegment}>
            MEMBERS
          </GroupViewSegmentButton>
        </IonSegment>
      </div>
      <SegmentPanel value="about" selected={selectedSegment}>
        {/* <GroupAbout /> */}
      </SegmentPanel>
      <SegmentPanel value="events" selected={selectedSegment}>
        {/* <GroupEvents /> */}
      </SegmentPanel>
      <SegmentPanel value="members" selected={selectedSegment}>
        {/* <GroupMembers /> */}
      </SegmentPanel>
    </IonPage>
  );
}

export default GroupView;

const testGroup = {
  id: "id-1",
  name: "Group Name 1",
  categoryId: "cid-1",
  category: "Category 1",
  imgUrl: "https://picsum.photos/200",
  about: "This is About",
};
