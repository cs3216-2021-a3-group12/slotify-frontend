import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonIcon,
} from "@ionic/react";
import { paperPlaneOutline, mailOutline } from "ionicons/icons";
import Tag from "../Components/Tag";
import { useState } from "react";
import { AdminSignup } from "../types/EventSignUp";
import { User } from "../types/User";
import axios from "axios";
import { useAuthState } from "../AuthContext";

function SignUpPersonCard({
  isAdmin,
  signUp,
  user,
}: {
  isAdmin: boolean;
  signUp: AdminSignup;
  user: User;
}) {
  const [signup, setSignup] = useState<AdminSignup>(signUp);
  const userDetails = useAuthState();

  const toggleAttendance = () => {
    axios
      .put(
        `/events/admin/signups/${signup.signup_id}`,
        {
          has_attended: !signup.has_attended,
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails.accessToken}`,
          },
        }
      )
      .then((response) => {
        const updatedSignup = response.data as AdminSignup;
        setSignup(updatedSignup);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <IonCard className="rounded-2xl mt-3">
      <IonCardHeader className="text-left px-1 py-0 truncate">
        <div className="flex justify-between">
          <div className="w-1/2 flex flex-col p-3">
            <IonCardTitle className="truncate text-base">
              {user.username}
            </IonCardTitle>
            <IonCardSubtitle>{user.student_number}</IonCardSubtitle>
            <IonCardSubtitle>{user.nusnet_id}</IonCardSubtitle>
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
            <Tag color="primary" label="Junior" />
            {isAdmin && (
              <div className="flex flex-col items-center m-1">
                <p>Attended</p>
                <IonCheckbox
                  slot="end"
                  className="m-0"
                  checked={signup.has_attended}
                  onIonChange={toggleAttendance}
                ></IonCheckbox>
              </div>
            )}
          </div>
        </div>
      </IonCardHeader>
    </IonCard>
  );
}

export default SignUpPersonCard;
