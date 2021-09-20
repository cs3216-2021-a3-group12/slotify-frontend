import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonList,
  IonBackButton,
  IonAlert,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonTitle,
} from "@ionic/react";
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  idCardOutline,
  globeOutline,
  paperPlaneOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import Tag from "../Components/Tag";
import { Membership } from "../types/Membership";

const ManageMembership: React.FC<{
  membership: Membership;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
}> = ({ membership, setShowModal }) => {
  const [newMembership, setNewMembership] = useState(membership);

  const [showTagAlert, setShowTagAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  function updateMembership() {
    console.log(newMembership);
  }

  function onCirfirm() {
    updateMembership();
    setShowModal(false);
  }
  function removeMember() {
    console.log(newMembership);
    setShowModal(false);
  }
  useEffect(() => {
    updateMembership();
  }, [newMembership]);

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
          Ariana Grande
        </IonLabel>

        <div>
          <div className="flex flex-col gap-5 p-10 items-center">
            <div className="flex items-center justify-between">
              <IonLabel className="text-xl text-left font-mono font-bold">
                Admin Status:
              </IonLabel>
              <Tag
                color="primary"
                label={newMembership.isAdmin ? "Admin" : "not Admin"}
              ></Tag>
            </div>
            <IonButton
              shape="round"
              onClick={() =>
                setNewMembership({
                  ...newMembership,
                  isAdmin: !newMembership.isAdmin,
                })
              }
            >
              {newMembership.isAdmin
                ? "Remove Admin Privilege"
                : "Change to Admin"}
            </IonButton>
            <div className="flex items-center justify-between">
              <IonLabel className="text-xl text-left font-mono font-bold">
                Current Tag:
              </IonLabel>
              <Tag color="primary" label="Senior"></Tag>
            </div>

            <IonButton shape="round" onClick={() => setShowTagAlert(true)}>
              Change Tag
            </IonButton>
          </div>

          <div className="flex flex-col gap-4 mx-12">
            <IonButton onClick={updateMembership}>Confirm</IonButton>

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
              name: "noTag",
              type: "radio",
              label: "No Tag",
              value: "value1",
              handler: () => {
                console.log("Radio 1 selected");
              },
              checked: true,
            },
            {
              name: "junior",
              type: "radio",
              label: "junior",
              value: "value2",
              handler: () => {
                console.log("Radio 2 selected");
              },
            },
            {
              name: "senior",
              type: "radio",
              label: "senior",
              value: "value3",
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
                removeMember();
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ManageMembership;
