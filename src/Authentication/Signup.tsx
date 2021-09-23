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
  IonModal,
} from "@ionic/react";
import { personOutline, mailOutline, lockClosedOutline } from "ionicons/icons";
import { useState } from "react";
import axios from "axios";

import AuthField from "./AuthField";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useHistory } from "react-router";
import { googleLoginUser, useAuthDispatch } from "../AuthContext";
import { capitalizeFirstLetter } from "../helper/stringHelper";

const Signup: React.FC = () => {
  const history = useHistory();
  const dispatch = useAuthDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  function signUpUserWithEmail() {
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all the blanks.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Your passwords do not match.");
      return;
    }

    setErrorMessage("");

    axios
      .post("https://api.slotify.club/api/v1/auth/register/", {
        username: name,
        email: email,
        password: password,
      })
      .then((res) => {
        const userData = res.data;
        if (userData && userData.username && userData.email) {
          setShowModal(true);
        }
      })
      .catch((error) => {
        const errorData = error.response.data;
        var errorMessages: [string?] = [];
        Object.keys(errorData).forEach(function (key) {
          const message = capitalizeFirstLetter(errorData[key]);
          errorMessages.push(message);
        });
        setErrorMessage(errorMessages.join("\r\n"));
      });
  }

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    googleLoginUser(dispatch, response).then((data) => {
      if (data) {
        history.push("/home");
      }
    });
  };

  return (
    <IonPage className="">
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <meta
        name="google-signin-client_id"
        content="468369724687-cjd8anth41lip4o1hambrnfr09qunbcj.apps.googleusercontent.com"
      />
      <IonModal isOpen={showModal} cssClass="my-custom-class">
        <p>
          Successfully registered! We have sent you an email to verify your
          account. You may log in after verifying it.
        </p>
        <IonButton
          onClick={() => {
            setShowModal(false);
            history.push("/login");
          }}
        >
          Return to Login
        </IonButton>
      </IonModal>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons>
            <IonBackButton
              color="primary"
              defaultHref="/login"
              className="mx-3 w-1/4"
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="text-center">
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
        </IonList>
        {/* {TODO: make this nicer} */}
        <p>{errorMessage}</p>
        <IonButton onClick={signUpUserWithEmail} className="w-5/6">
          Sign up
        </IonButton>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
