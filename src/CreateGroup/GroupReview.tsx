import { IonButton, IonIcon, IonItem, IonList, IonText } from "@ionic/react";
import { peopleOutline, reorderFourOutline } from "ionicons/icons";
import Tag from "../Components/Tag";
import React from "react";

type GroupDetails = {
  name: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  imgBlob?: string;
};
type GroupReviewProps = {
  group: GroupDetails;
  onBack?: () => void;
  onCreate?: () => void;
};

const GroupReview: React.FC<GroupReviewProps> = ({
  group,
  onBack,
  onCreate,
}) => {
  return (
    <IonList
      lines="none"
      className="m-auto mt-1 w-full  min-h-10/12-screen flex flex-col items-stretch justify-start"
    >
      <IonItem className="m-3">
        <IonIcon slot="start" icon={peopleOutline} />
        <IonText>{group.name}</IonText>
      </IonItem>
      <IonItem className="m-3">
        <IonIcon slot="start" icon={reorderFourOutline} />
        {group.description ? (
          <IonText>{group.description}</IonText>
        ) : (
          <IonText className="opacity-50 italic">Description</IonText>
        )}
      </IonItem>
      <div className="m-3 py-3">
        <p className="text-sm font-bold">Category:</p>
        {group.categoryName ? (
          <Tag label={group.categoryName} color="primary" />
        ) : (
          <p className="italic opacity-50">None</p>
        )}
      </div>
      <div className="m-3 py-3">
        <p className="text-sm font-bold">Group Banner:</p>
        {group.imgBlob ? (
          <img src={group.imgBlob} alt="group banner" />
        ) : (
          <p className="italic opacity-50">None</p>
        )}
      </div>
      <div className="mt-auto self-center w-full">
        <IonButton onClick={onBack} className="w-5/6">
          Back
        </IonButton>
        <IonButton onClick={onCreate} className="w-5/6">
          Create
        </IonButton>
      </div>
    </IonList>
  );
};

export default GroupReview;
