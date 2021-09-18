import { useState, useEffect } from "react";
import { IonButton, IonLabel, IonList } from "@ionic/react";
import { peopleOutline, reorderFourOutline } from "ionicons/icons";
import { Category } from "../types/Category";

import ImageUploadInput from "../Components/ImageUploadInput";
import TextInput from "../Components/TextInput";
import TextArea from "../Components/TextArea";
import Tag from "../Components/Tag";
import React from "react";
import { CreateGroupDetails } from "../types/Group";

type GroupFormProps = {
  submitButtonLabel: string;
  onSubmit: (group: CreateGroupDetails) => void;
  [other: string]: any;
};

const GroupForm: React.FC<GroupFormProps> = ({
  submitButtonLabel,
  onSubmit,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("https://api.slotify.club/api/v1/groups/categories/?format=json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data.results);
      });
  }, []);

  function onCategoryClick(value: number) {
    if (selectedCategoryId === value) {
      setSelectedCategoryId(-1);
    } else {
      setSelectedCategoryId(value);
    }
  }

  function onSubmitButtonClick() {
    if (!name) {
      setNameError("Please enter a group name");
      return;
    }

    setNameError("");

    const category = categories.find(
      (category) => category.id === selectedCategoryId
    );
    onSubmit({
      name,
      description,
      categoryId: category?.id,
      categoryName: category?.name,
      imgBlob: image,
    });
  }

  return (
    <IonList lines="none" className="mt-1">
      <TextInput
        icon={peopleOutline}
        outline={true}
        value={name}
        placeholder="Group Name"
        onValueChange={setName}
        errorValue={nameError}
      />
      <TextArea
        outline={true}
        icon={reorderFourOutline}
        value={description}
        placeholder="Description"
        onValueChange={setDescription}
      ></TextArea>
      <div className="m-3">
        <IonLabel>Select a Category</IonLabel>
        <div className="py-2 mx-2">
          {categories.map((category) => {
            return (
              <Tag
                key={category.id}
                color={
                  selectedCategoryId === category.id ? "primary" : undefined
                }
                label={category.name}
                className="whitespace-nowrap"
                onClick={() => onCategoryClick(category.id)}
              />
            );
          })}
        </div>
      </div>
      <ImageUploadInput
        value={image}
        setValue={setImage}
        promptText="Upload Banner"
        className="m-3"
      />
      <IonButton onClick={onSubmitButtonClick} className="w-5/6">
        {submitButtonLabel}
      </IonButton>
    </IonList>
  );
};

export default GroupForm;
