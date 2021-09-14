import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonList,
} from "@ionic/react";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { useState } from "react";
import AuthField from "./AuthField";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginUser() {
    console.log(email, password);
  }

  return (
    <IonPage>
      <IonContent className="text-center">
        <div className="mt-10">
          <IonLabel color="primary" className="text-5xl">
            Slotify
          </IonLabel>
        </div>

        <IonList lines="none" className="sm: mx-10 md: mx-20 lg:mx-40">
          <AuthField
            type="email"
            icon={mailOutline}
            value={email}
            placeholder="Your Email"
            setValue={setEmail}
          />
          <AuthField
            type="password"
            icon={lockClosedOutline}
            value={password}
            placeholder="Your Password"
            setValue={setPassword}
          />
        </IonList>
        <IonButton onClick={loginUser}>Log in</IonButton>
        <IonButton routerLink="/signup">Sign up</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
