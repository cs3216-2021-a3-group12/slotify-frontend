import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonList,
  IonBackButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
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
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "../AuthContext";
import { emptyProfile, Profile } from "../types/Profile";

const UserProfile: React.FC = () => {
  const userDetails = useAuthState();

  const [profile, setProfile] = useState<Profile>(emptyProfile);

  useEffect(() => {
    axios
      .get("https://api.slotify.club/api/v1/auth/profile/", {
        headers: { Authorization: `Bearer ${userDetails.accessToken}` },
      })
      .then((profile) => {
        setProfile(profile.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons>
            <IonBackButton
              color="primary"
              defaultHref="/home"
              className="m-5"
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="text-center">
        <div className="flex flex-col items-center">
          <IonLabel className="text-5xl font-serif m-2">
            {profile.username}
          </IonLabel>
        </div>
        <IonList lines="none">
          <ProfileField
            icon={mailOutline}
            title="Email"
            value={profile.email}
          />
          <ProfileField
            icon={idCardOutline}
            title="Student Number"
            value={profile.student_number}
          />
          <ProfileField
            icon={globeOutline}
            title="NUSNET ID"
            value={profile.nusnet_id}
          />
          <ProfileField
            icon={paperPlaneOutline}
            title="Telgram Handle (optional)"
            value={profile.telegram_handle}
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
