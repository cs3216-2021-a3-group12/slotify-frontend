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
import { lockClosedOutline } from "ionicons/icons";
import { useState } from "react";
import AuthField from "../Authentication/AuthField";
const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function changePassword() {
    console.log(password);
  }

  return (
    <IonPage className="sm: mx-10 lg:mx-40">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons>
            <IonBackButton
              color="primary"
              defaultHref="/profile"
              className="mx-4 w-10"
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="text-center">
        <IonLabel color="primary" className="text-5xl">
          Change Password
        </IonLabel>
        <IonList lines="none">
          <AuthField
            type="password"
            icon={lockClosedOutline}
            value={password}
            placeholder="New Password"
            setValue={setPassword}
          />
          <AuthField
            type="password"
            icon={lockClosedOutline}
            value={confirmPassword}
            placeholder="Confirm Password"
            setValue={setConfirmPassword}
          />
        </IonList>
        <IonButton onClick={changePassword} className="w-5/6">
          Confirm
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
