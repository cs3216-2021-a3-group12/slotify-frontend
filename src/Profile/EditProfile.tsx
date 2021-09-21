import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonList,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
import {
  personOutline,
  mailOutline,
  idCardOutline,
  globeOutline,
  paperPlaneOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import AuthField from "../Authentication/AuthField";

const EditProfile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentNum, setStudentNum] = useState("");
  const [nusnetId, setNusnetId] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");

  function editUserProfile() {
    console.log(name);
  }

  useEffect(() => {
    // Load Current User Profile and replace values with it
  });

  return (
    <IonPage className="sm: m-0 lg:mx-40">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons>
            <IonBackButton color="primary" className="m-4 w-1/4" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="text-center">
        <IonLabel color="primary" className="text-5xl">
          Edit Profile
        </IonLabel>
        <IonList lines="none">
          <AuthField
            icon={personOutline}
            value={name}
            placeholder="Full Name"
            setValue={setName}
          />
          <AuthField
            type="email"
            icon={mailOutline}
            value={email}
            placeholder="Email"
            setValue={setEmail}
          />
          <AuthField
            icon={idCardOutline}
            value={studentNum}
            placeholder="Student Number"
            setValue={setStudentNum}
          />
          <AuthField
            icon={globeOutline}
            value={nusnetId}
            placeholder="NUSNET ID"
            setValue={setNusnetId}
          />
          <AuthField
            icon={paperPlaneOutline}
            value={telegramHandle}
            placeholder="Telegram Handle (optional)"
            setValue={setTelegramHandle}
          />
        </IonList>
        <IonButton onClick={editUserProfile} className="w-2/3">
          Confirm
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
