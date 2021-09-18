import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import { useState, useEffect, Fragment } from "react";
import { StrippedEvent } from "../types/Event";
import { StrippedGroup } from "../types/Group";

export interface ExploreEventsProps {
  events: StrippedEvent[];
}

function GroupAbout() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [group, setGroup] = useState<StrippedGroup>(testGroup);

  useEffect(() => {
    setIsAdmin(false);
    setGroup(testGroup);
  }, []);

  return (
    <IonContent>
      <p className="group-about-text">group.about</p>
      <div className="flex flex-col">
        <IonButton>Edit Group</IonButton>
        <IonButton>Delete Group</IonButton>
      </div>
    </IonContent>
  );
}

export default GroupAbout;

const testGroup = {
  id: "id-1",
  name: "Group Name 1",
  categoryId: "cid-1",
  category: "Category 1",
  imgUrl: "https://picsum.photos/200",
  about: "This is About",
};
