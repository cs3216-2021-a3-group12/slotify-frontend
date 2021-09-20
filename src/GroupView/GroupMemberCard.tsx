import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { paperPlaneOutline, mailOutline, createOutline } from "ionicons/icons";
import { Member } from "../types/Member";
import Tag from "../Components/Tag";
import { useState } from "react";
import ManageMembership from "./ManageMembership";

function GroupMemberCard({
  isAdmin,
  member,
}: {
  isAdmin: boolean;
  member: Member;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonCard className="rounded-2xl w-5/6 h-1/3 mt-3">
      <IonCardHeader className="text-left px-1 py-0 truncate">
        <div className="flex justify-between">
          <div className="w-1/2 flex flex-col p-3">
            <IonCardTitle className="truncate text-base">
              {member.name}
            </IonCardTitle>
            <IonCardSubtitle>A0123456X</IonCardSubtitle>
            <IonCardSubtitle>E0123456</IonCardSubtitle>
          </div>
          <div className="flex items-center">
            <IonCardSubtitle className="flex flex-col -ml-3">
              <IonButton size="small" fill="clear">
                {/* TODO: disable the button if the user doesn't have telegram handle */}
                <IonIcon icon={paperPlaneOutline} />
              </IonButton>
              <IonButton size="small" fill="clear">
                <IonIcon icon={mailOutline} />
              </IonButton>
            </IonCardSubtitle>
            <IonCardSubtitle className="flex flex-col text-center">
              <IonLabel>{member.isAdmin && "Admin"}</IonLabel>
              <Tag color="primary" label={member.tagName} />
            </IonCardSubtitle>
            {isAdmin && (
              <IonButton
                fill="clear"
                size="large"
                className="-mx-4"
                onClick={() => setShowModal(true)}
              >
                <IonIcon icon={createOutline} />
              </IonButton>
            )}
          </div>
        </div>
      </IonCardHeader>
      <IonModal
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        swipeToClose={true}
      >
        <ManageMembership
          membership={testMembership}
          setShowModal={setShowModal}
        />
      </IonModal>
    </IonCard>
  );
}

export default GroupMemberCard;

const testMembership = {
  userId: 1,
  groupId: 1,
  tagId: 1,
  isAdmin: false,
};
