import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonList,
  IonBackButton,
} from "@ionic/react";
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  idCardOutline,
  globeOutline,
  paperPlaneOutline,
} from "ionicons/icons";
import { useState } from "react";
import AuthField from "./AuthField";
const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentNum, setStudentNum] = useState("");
  const [nusnetId, setNusnetId] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");

  function signUpUser() {
    console.log(name);
  }

  return (
    <IonPage className="sm: my-3 lg:mx-40">
      <IonBackButton
        color="primary"
        defaultHref="/login"
        className="mx-3 w-1/4"
      />

      <IonContent className="text-center" scrollY={false}>
        <IonLabel color="primary" className="text-5xl">
          Sign Up
        </IonLabel>
        <IonList lines="none" className="mt-1">
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
            type="password"
            icon={lockClosedOutline}
            value={password}
            placeholder="Enter Password"
            setValue={setPassword}
          />
          <AuthField
            type="password"
            icon={lockClosedOutline}
            value={confirmPassword}
            placeholder="Confirm Password"
            setValue={setConfirmPassword}
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
        <IonButton onClick={signUpUser} className="w-5/6">
          Sign up
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
