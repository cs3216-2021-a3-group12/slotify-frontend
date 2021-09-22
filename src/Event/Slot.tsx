import {
  IonButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { addOutline, timeOutline } from "ionicons/icons";
import { emptyProfile, Profile } from "../types/Profile";
import axios from "axios";
import { useAuthState } from "../AuthContext";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
export enum SlotStatus {
  Waitlist = "Waitlist",
  Signup = "Signup",
}

interface SlotProps {
  tag: string;
  remainingSlots: number;
  status: SlotStatus;
}
function Slot({ tag, remainingSlots, status }: SlotProps): JSX.Element {
  const userDetails = useAuthState();
  const history = useHistory();

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

  function onClick() {
    if (!Boolean(profile.student_number) || !Boolean(profile.nusnet_id)) {
      history.push("/profile/editprofile");
      return;
    }

    // MSS
  }
  return (
    <IonItem
      color={`${status === SlotStatus.Waitlist ? "light" : "success"}`}
      className="rounded-lg m-2"
    >
      <IonGrid>
        <IonRow>
          <IonLabel className="font-bold capitalize">{tag}</IonLabel>
        </IonRow>
        <IonRow>
          <IonLabel className="text-xs">
            Remaining slots: {remainingSlots}
          </IonLabel>
        </IonRow>
      </IonGrid>
      <IonButton slot="end" className="w-32" onClick={onClick}>
        {status}
        <IonIcon
          slot="start"
          icon={status === SlotStatus.Signup ? addOutline : timeOutline}
        />
      </IonButton>
    </IonItem>
  );
}

export default Slot;
