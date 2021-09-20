import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonList,
} from "@ionic/react";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import AuthField from "./AuthField";
import { useAuthDispatch, loginUser } from "../AuthContext";

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useAuthDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onLogin() {
    console.log(email, password);
    loginUser(dispatch, {
      email: email,
      password: password,
    }).then((data) => {
      if (data) {
        history.push("/home");
      }
    });
  }

  return (
    <IonPage className="sm: mx-2 lg:mx-40">
      <IonContent className="text-center">
        <div className="mt-10 mb-5">
          <IonLabel color="primary" className="text-5xl">
            Slotify
          </IonLabel>
        </div>

        <IonList lines="none">
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
        <div className="flex flex-col items-center gap-5">
          <IonButton onClick={onLogin} className="w-2/3">
            Log in
          </IonButton>
          <IonButton routerLink="/signup" className="w-2/3">
            Sign up
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
