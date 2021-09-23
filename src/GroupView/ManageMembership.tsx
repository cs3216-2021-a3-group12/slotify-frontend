import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonAlert,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";
import Tag from "../Components/Tag";
import { Member } from "../types/Member";
import { Membership } from "../types/Membership";

const ManageMembership: React.FC<{
  member: Member;
  membership: Membership;
  updateMembership: (membership: Membership) => void;
  removeMember: () => void;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
}> = ({ member, membership, setShowModal, removeMember, updateMembership }) => {
  const [newMembership, setNewMembership] = useState<Membership>(membership);
  const [showTagAlert, setShowTagAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  function OnConfirm() {
    updateMembership(newMembership);
  }

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
          <IonTitle>Change Membership</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="text-center">
        <IonLabel
          color="primary"
          className="text-4xl text-center truncate font-serif"
        >
          {member.username}
        </IonLabel>
        <div>
          <div className="flex flex-col gap-5 p-10 items-center">
            <div className="w-full flex items-center justify-between">
              <IonLabel className="text-xl text-left font-mono font-bold">
                Admin Status:
              </IonLabel>
              <Tag
                color="primary"
                label={newMembership.is_admin ? "Admin" : "not Admin"}
              ></Tag>
            </div>
            <IonButton
              shape="round"
              onClick={() => {
                if (newMembership) {
                  setNewMembership({
                    ...newMembership,
                    is_admin: !newMembership.is_admin,
                  });
                }
              }}
            >
              {membership.is_admin
                ? "Remove Admin Privilege"
                : "Change to Admin"}
            </IonButton>
            <div className="w-full flex items-center justify-between">
              <IonLabel className="text-xl text-left font-mono font-bold">
                Current Tag:
              </IonLabel>
              <Tag
                color="primary"
                label={newMembership.tag ? newMembership.tag : "No Tag"}
              ></Tag>
            </div>

            <IonButton shape="round" onClick={() => setShowTagAlert(true)}>
              Change Tag
            </IonButton>
          </div>

          <div className="flex flex-col gap-4 mx-12">
            <IonButton onClick={OnConfirm}>Confirm</IonButton>
            <IonButton color="danger" onClick={() => setShowDeleteAlert(true)}>
              Remove this Member
            </IonButton>
          </div>
        </div>
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
                removeMember();
              },
            },
          ]}
        />
        <IonAlert
          isOpen={showTagAlert}
          onDidDismiss={() => setShowTagAlert(false)}
          header={"Choose a tag for this member"}
          inputs={[
            {
              name: "noTag",
              type: "radio",
              label: "No Tag",
              value: "noTag",
              handler: () => {
                setNewMembership((newMembership) => {
                  return { ...newMembership, tag: "" };
                });
              },
              checked: newMembership.tag === null || newMembership.tag === "",
            },
            {
              name: "junior",
              type: "radio",
              label: "Junior",
              value: "1",
              handler: () => {
                setNewMembership((newMembership) => {
                  return { ...newMembership, tag: "Junior" };
                });
              },
              checked: newMembership.tag === "Junior",
            },
            {
              name: "senior",
              type: "radio",
              label: "Senior",
              value: "2",
              handler: () => {
                setNewMembership((newMembership) => {
                  return { ...newMembership, tag: "Senior" };
                });
              },
              checked: newMembership.tag === "Senior",
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
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ManageMembership;
