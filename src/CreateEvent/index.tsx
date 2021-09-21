import { Fragment, useState } from "react";
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
  peopleOutline,
  reorderFourOutline,
  timeOutline,
  locationOutline,
  hourglassOutline,
  bookmarkOutline,
} from "ionicons/icons";

import TextArea from "../Components/TextArea";
import TextInput from "../Components/TextInput";
import DateTimePicker from "../Components/DateTimePicker";
import Checkbox from "../Components/Checkbox";
import ImageUploadInput from "../Components/ImageUploadInput";
import NumberStepInput from "../Components/NumberStepInput";

function CreateEvent() {
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
  const [totalSlots, setTotalSlots] = useState(0);
  const [reserveSlots, setReserveSlots] = useState(false);
  const [juniorSlots, setJuniorSlots] = useState(0);
  const [seniorSlots, setSeniorSlots] = useState(0);
  const [hasSignupDeadline, setHasSignupDeadline] = useState(false);
  const [signupDeadline, setSignupDeadline] = useState<Date>(new Date());

  function onImageChange(imageSrc: string, fileName: string) {
    setImageSrc(imageSrc);
    setImageFileName(fileName);
  }
  function getDateString(date: Date) {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
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
    // TODO: Add group
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
    // TODO: tag id as key
    var slots: { [tag: string]: number } = {};
    var remainingSlots = totalSlots;
    if (reserveSlots) {
      slots["junior"] = juniorSlots;
      slots["senior"] = seniorSlots;
      remainingSlots -= juniorSlots + seniorSlots;
    }
    if (isPublic) {
      slots["public"] = remainingSlots;
    } else {
      slots["groupmembers"] = remainingSlots;
    }
    formData.append("slots", JSON.stringify(slots));

    createEvent(formData);
  }

  function createEvent(formData: FormData) {
    // @ts-ignore
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
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
          <IonItem>
            <IonLabel className="font-bold text-lg">Participant Slots</IonLabel>
          </IonItem>
          <p className="text-sm mx-4 text-left text-gray-500">
            Select the maximum number of participants.
          </p>

          <div className="flex justify-center m-4">
            <NumberStepInput
              value={totalSlots}
              onValueChange={setTotalSlots}
              min={0}
            />
          </div>
          <Checkbox
            color="primary"
            icon={peopleOutline}
            label="Reserve slots for members"
            checked={reserveSlots}
            onCheckChange={setReserveSlots}
            mode="ios"
          />
          <p className="text-sm mx-4 text-left text-gray-500">
            Set aside slots for members with specific tags. Remaining slots can
            be taken by any other members (or non group members if public).
          </p>
          {reserveSlots && (
            <Fragment>
              <IonItem>
                <IonLabel slot="start" className="text-indigo-500 font-bold">
                  Junior
                </IonLabel>
                <NumberStepInput
                  slot="end"
                  value={juniorSlots}
                  onValueChange={setJuniorSlots}
                  min={0}
                  max={totalSlots - seniorSlots}
                />
              </IonItem>

              <IonItem>
                <IonLabel slot="start" className="text-indigo-500 font-bold">
                  Senior
                </IonLabel>
                <NumberStepInput
                  slot="end"
                  value={seniorSlots}
                  onValueChange={setSeniorSlots}
                  min={0}
                  max={totalSlots - juniorSlots}
                />
              </IonItem>

              <IonItem>
                <p>
                  Remaining slots for others:{" "}
                  <span className="text-indigo-500">
                    {totalSlots - juniorSlots - seniorSlots}
                  </span>
                </p>
              </IonItem>
            </Fragment>
          )}

          <Checkbox
            color="primary"
            icon={hourglassOutline}
            label="Sign up deadline"
            checked={hasSignupDeadline}
            onCheckChange={setHasSignupDeadline}
            mode="ios"
          />
          {hasSignupDeadline && (
            <DateTimePicker
              outline={true}
              color="primary"
              icon={timeOutline}
              label="Deadline"
              value={signupDeadline}
              onValueChange={setSignupDeadline}
              displayFormat="YYYY-MM-DD HH:mmA"
              min={getDateString(startTime)}
              max="2025"
            />
          )}
        </IonList>
        <IonButton className="w-5/6 my-8" onClick={onCreateClick}>
          Create
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default CreateEvent;
