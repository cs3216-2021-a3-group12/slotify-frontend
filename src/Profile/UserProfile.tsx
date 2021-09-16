import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonList,
  IonBackButton,
  IonIcon,
} from "@ionic/react";
import {
  createOutline,
  mailOutline,
  idCardOutline,
  globeOutline,
  paperPlaneOutline,
  lockClosedOutline,
} from "ionicons/icons";
import ProfileField from "./ProfileField";

const UserProfile: React.FC = () => {
  // fetch profile
  const email = "john@gmail.com";
  const studentNum = "A0123456X";
  const nusnetId = "E0123456";
  const telegramHandle = "@johnwick";

  return (
    <IonPage className="sm: m-0 lg:mx-40">
      <IonBackButton
        color="primary"
        defaultHref="/home"
        className="m-4 w-1/4"
      />
      <IonContent className="text-center">
        <div className="flex flex-col items-center">
          <IonLabel className="text-5xl font-serif">John Wick</IonLabel>
        </div>
        <IonList lines="none">
          <ProfileField icon={mailOutline} title="Email" value={email} />
          <ProfileField
            icon={idCardOutline}
            title="Student Number"
            value={studentNum}
          />
          <ProfileField
            icon={globeOutline}
            title="NUSNET ID"
            value={nusnetId}
          />
          <ProfileField
            icon={paperPlaneOutline}
            title="Telgram Handle (optional)"
            value={telegramHandle}
          />
        </IonList>

        <div className="flex flex-col items-center gap-5">
          <IonButton routerLink="/profile/editprofile" className="w-3/5">
            <IonIcon slot="start" icon={createOutline} />
            Edit Profile
          </IonButton>
          <IonButton routerLink="/profile/changepassword" className="w-3/5">
            <IonIcon slot="start" icon={lockClosedOutline} />
            Change Password
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
