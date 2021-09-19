import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { paperPlaneOutline, mailOutline } from "ionicons/icons";
import { Member } from "../types/Member";
import Tag from "../Components/Tag";
import { useState } from "react";

function GroupMemberCard({
  isAdmin,
  member,
}: {
  isAdmin: boolean;
  member: Member;
}) {
  const [showTagAlert, setShowTagAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  return (
    <IonCard className="rounded-2xl w-5/6 h-1/3 mt-3 flex justify-between">
      <IonCardHeader className="text-left px-2 py-0 truncate">
        <div className="flex content-between">
          <div className="w-1/2-screen flex flex-col p-3">
            <IonCardTitle className="truncate text-lg">
              {member.name}
            </IonCardTitle>
            <IonCardSubtitle>A0123456X</IonCardSubtitle>
            <IonCardSubtitle>E0123456</IonCardSubtitle>
          </div>
          <div className="flex items-center">
            <IonCardSubtitle className="flex flex-col items-center">
              <IonButton size="small" fill="clear">
                {/* TODO: disable the button if the user doesn't have telegram handle */}
                <IonIcon icon={paperPlaneOutline} className="m-1" />
              </IonButton>
              <IonButton size="small" fill="clear">
                <IonIcon icon={mailOutline} className="m-1" />
              </IonButton>
            </IonCardSubtitle>
            {isAdmin ? (
              <div className="flex flex-col place-self-center">
                <IonButton
                  size="small"
                  shape="round"
                  onClick={() => setShowTagAlert(true)}
                >
                  {member.tagName}
                </IonButton>
                <IonButton
                  size="small"
                  shape="round"
                  color="danger"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  Remove
                </IonButton>
              </div>
            ) : (
              <Tag color="primary" label={member.tagName} className="px-5" />
            )}
          </div>
        </div>
      </IonCardHeader>
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={"Warning"}
        message={"Are you sure you want to remove this member?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Remove",
            cssClass: "text-red-500",
            handler: () => {
              console.log("Delete Member");
            },
          },
        ]}
      />
      <IonAlert
        isOpen={showTagAlert}
        onDidDismiss={() => setShowTagAlert(false)}
        header={"Choose a tag for this member"}
        // TODO: get all the tag categories and checked the current tag
        inputs={[
          {
            name: "junior",
            type: "radio",
            label: "Radio 1",
            value: "value1",
            handler: () => {
              console.log("Radio 1 selected");
            },
            checked: true,
          },
          {
            name: "senior",
            type: "radio",
            label: "Radio 2",
            value: "value2",
            handler: () => {
              console.log("Radio 2 selected");
            },
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              console.log("Confirm Cancel");
            },
          },
          {
            text: "Ok",
            handler: () => {
              console.log("Confirm Ok");
            },
          },
        ]}
      />
    </IonCard>
  );
}

export default GroupMemberCard;
