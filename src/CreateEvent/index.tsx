import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import {
  IonTitle,
  IonToolbar,
  IonPage,
  IonHeader,
  IonContent,
  IonBackButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import {
  lockOpenOutline,
  reorderFourOutline,
  timeOutline,
  locationOutline,
  bookmarkOutline,
} from "ionicons/icons";
import axios from "axios";

import TextArea from "../Components/TextArea";
import TextInput from "../Components/TextInput";
import DateTimePicker from "../Components/DateTimePicker";
import Checkbox from "../Components/Checkbox";
import ImageUploadInput from "../Components/ImageUploadInput";
import EventSlots from "./EventSlots";
import { useAuthState } from "../AuthContext";

function CreateEvent() {
  const history = useHistory();
  const userDetails = useAuthState();
  const { groupId } = useRouteMatch().params as { groupId: number };

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [publicSlots, setPublicSlots] = useState(0);
  const [memberSlots, setMemberSlots] = useState(0);
  const [juniorSlots, setJuniorSlots] = useState(0);
  const [seniorSlots, setSeniorSlots] = useState(0);

  function onImageChange(imageSrc: string, fileName: string) {
    setImageSrc(imageSrc);
    setImageFileName(fileName);
  }

  async function onCreateClick() {
    var hasError = false;
    if (!title) {
      setTitleError("Please enter an event title");
      hasError = true;
    }
    if (!location) {
      setLocationError("Please enter a location for the event");
      hasError = true;
    }

    if (hasError) return;
    setTitleError("");
    setLocationError("");

    // Create form data
    const formData = new FormData();
    formData.append("title", title);
    if (description) {
      formData.append("description", description);
    }
    formData.append(
      "start_date_time",
      String(Math.floor(startTime.getTime() / 1000.0))
    );
    formData.append(
      "end_date_time",
      String(Math.floor(endTime.getTime() / 1000.0))
    );
    formData.append("location", location);
    formData.append("is_public", String(isPublic));
    if (imageSrc) {
      const blob = await fetch(imageSrc)
        .then((res) => res.blob())
        .catch((err) => {
          console.error(err);
        });
      if (blob) {
        formData.append("image_url", blob, imageFileName ?? "image.jpg");
      }
    }
    // create slots dictionary
    var slots: { [tag: string]: number } = {};
    if (isPublic && publicSlots) slots["Public"] = publicSlots;
    if (memberSlots) slots["Members"] = memberSlots;
    if (juniorSlots) slots["Junior"] = juniorSlots;
    if (seniorSlots) slots["Senior"] = seniorSlots;
    formData.append("slots", JSON.stringify(slots));

    createEvent(formData);
  }

  function createEvent(formData: FormData) {
    axios
      .post(`https://api.slotify.club/api/v1/groups/${groupId}/events/new`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
        body: formData,
      })
      .then((res) => {
        if (res.data.id) {
          history.replace(`/events/${res.data.id}`);
        }
      })
      .catch((err) => {
        if (err.response.data) {
          console.error(err.response.data);
        } else {
          console.error(err);
        }
      });
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="primary" defaultHref="/home" />
          </IonButtons>
          <IonTitle className="text-2xl">Create an Event</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="text-center">
        <IonList lines="none">
          <TextInput
            outline={true}
            color="primary"
            icon={bookmarkOutline}
            value={title}
            placeholder="Event Title"
            onValueChange={setTitle}
            errorValue={titleError}
          />
          <TextArea
            outline={true}
            color="primary"
            icon={reorderFourOutline}
            value={description}
            placeholder="Description"
            onValueChange={setDescription}
          ></TextArea>
          <DateTimePicker
            outline={true}
            color="primary"
            icon={timeOutline}
            label="Start Time"
            value={startTime}
            onValueChange={setStartTime}
            displayFormat="YYYY-MM-DD HH:mmA"
            min="2021"
            max="2025"
          ></DateTimePicker>
          <DateTimePicker
            outline={true}
            color="primary"
            icon={timeOutline}
            label="End Time"
            value={endTime}
            onValueChange={setEndTime}
            displayFormat="YYYY-MM-DD HH:mmA"
            min="2021"
            max="2025"
          ></DateTimePicker>
          <TextInput
            outline={true}
            color="primary"
            icon={locationOutline}
            value={location}
            placeholder="Location"
            onValueChange={setLocation}
            errorValue={locationError}
          />
          <Checkbox
            color="primary"
            icon={lockOpenOutline}
            label="Make event public"
            checked={isPublic}
            onCheckChange={setIsPublic}
            mode="ios"
          />
          <p className="text-sm mx-4 px-3 text-left text-gray-500">
            Public events can be seen and joined by non-group members.
          </p>
          <ImageUploadInput
            imgSrc={imageSrc}
            onImgSrcChange={onImageChange}
            promptText="Add Event Photo"
            className="m-3"
          />

          {/* Slots */}

          <IonItem>
            <IonLabel className="font-bold text-lg">Participant Slots</IonLabel>
          </IonItem>
          <p className="text-sm mx-4 text-left text-gray-500">
            Select the maximum number of slots for different participants.
          </p>
          {isPublic && (
            <EventSlots
              slot="end"
              label="Public"
              subLabel="Anyone (including non-members)."
              value={publicSlots}
              onValueChange={setPublicSlots}
              min={0}
            />
          )}
          <EventSlots
            slot="end"
            label="Members"
            subLabel="Members regardless of tag."
            value={memberSlots}
            onValueChange={setMemberSlots}
            min={0}
          />
          <EventSlots
            slot="end"
            label="Junior"
            subLabel="Members tagged Junior."
            value={juniorSlots}
            onValueChange={setJuniorSlots}
            min={0}
          />

          <EventSlots
            slot="end"
            label="Senior"
            subLabel="Members tagged Senior."
            value={seniorSlots}
            onValueChange={setSeniorSlots}
            min={0}
          />
          <IonItem>
            <p>
              Total slots :{" "}
              <span className="text-indigo-500">
                {isPublic
                  ? publicSlots + memberSlots + juniorSlots + seniorSlots
                  : memberSlots + juniorSlots + seniorSlots}
              </span>
            </p>
          </IonItem>
        </IonList>
        <IonButton className="w-5/6 my-8" onClick={onCreateClick}>
          Create
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default CreateEvent;
