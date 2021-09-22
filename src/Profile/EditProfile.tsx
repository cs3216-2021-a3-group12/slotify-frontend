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
import { useHistory } from "react-router";
import { useAuthState } from "../AuthContext";
import AuthField from "../Authentication/AuthField";
import axios from "axios";
import TextInput from "../Components/TextInput";

const EditProfile: React.FC = () => {
  const history = useHistory();
  const userDetails = useAuthState();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [student_number, setStudentNum] = useState("");
  const [studentNumError, setStudentNumError] = useState("");
  const [nusnet_id, setNusnetId] = useState("");
  const [nusnetIdError, setNusnetIdError] = useState("");
  const [telegram_handle, setTelegramHandle] = useState("");

  useEffect(() => {
    axios
      .get("https://api.slotify.club/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${userDetails.accessToken}` },
      })
      .then((profile) => {
        const data = profile.data;
        setUsername(data.username);
        setEmail(data.email);
        setStudentNum(data.student_number);
        setNusnetId(data.nusnet_id);
        setTelegramHandle(data.telegram_handle);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  async function onConfirm() {
    var hasError = false;
    if (!username) {
      setUsernameError("Your user name cannot be empty");
      hasError = true;
    }
    if (!student_number) {
      setStudentNumError("Please enter your student number");
      hasError = true;
    }
    if (!nusnet_id) {
      setNusnetIdError("Please enter your NUSNET ID");
      hasError = true;
    }
    if (hasError) return;
    setUsernameError("");
    setStudentNumError("");
    setNusnetIdError("");

    // Create form data
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("student_number", student_number);
    formData.append("nusnet_id", nusnet_id);
    if (telegram_handle) {
      formData.append("telegram_handle", telegram_handle);
    }
    editProfile(formData);
  }

  function editProfile(formData: FormData) {
    // @ts-ignore
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    axios
      .put(`https://api.slotify.club/api/v1/auth/profile`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
        body: formData,
      })
      .then((res) => {
        if (res.data) {
          history.push(`/profile`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons>
            <IonBackButton color="primary" className="m-5" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="text-center">
        <IonLabel color="primary" className="text-5xl">
          Edit Profile
        </IonLabel>
        <div className="flex flex-col gap-3 p-3">
          <TextInput
            outline={true}
            color="primary"
            icon={personOutline}
            value={username}
            placeholder="Full Name"
            onValueChange={setUsername}
            errorValue={usernameError}
          />
          <TextInput
            outline={true}
            color="primary"
            icon={idCardOutline}
            value={student_number}
            placeholder="Student Number"
            onValueChange={setStudentNum}
            errorValue={studentNumError}
          />
          <TextInput
            outline={true}
            color="primary"
            icon={globeOutline}
            value={nusnet_id}
            placeholder="NUSNET ID"
            onValueChange={setNusnetId}
            errorValue={nusnetIdError}
          />
          <TextInput
            outline={true}
            color="primary"
            icon={paperPlaneOutline}
            value={telegram_handle}
            placeholder="Telegram Handle (optional)"
            onValueChange={setTelegramHandle}
          />
        </div>
        <IonButton onClick={onConfirm} className="w-2/3">
          Confirm
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
