import { useState, useEffect } from "react";
import { IonButton, IonLabel, IonList } from "@ionic/react";
import { peopleOutline, reorderFourOutline } from "ionicons/icons";
import { Category } from "../types/Category";

import ImageUploadInput from "../Components/ImageUploadInput";
import TextInput from "../Components/TextInput";
import TextArea from "../Components/TextArea";
import Tag from "../Components/Tag";
import React from "react";
import { GroupFormDetails } from "../types/Group";
import axios from "axios";

type GroupFormProps = {
  group?: {
    name: string;
    description: string;
    selectedCategoryId: string;
    imageSrc?: string;
  };
  submitButtonLabel: string;
  onSubmit: (group: GroupFormDetails) => void;
  [other: string]: any;
};

const GroupForm: React.FC<GroupFormProps> = ({
  group,
  submitButtonLabel,
  onSubmit,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState(group?.name || "");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState(group?.description || "");
  const [descriptionError, setDescriptionError] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    group?.selectedCategoryId ?? -1
  );
  const [categoryError, setCategoryError] = useState("");
  const [imageSrc, setImageSrc] = useState(group?.imageSrc || "");
  const [imageFileName, setImageFileName] = useState("");

  useEffect(() => {
    axios
      .get("https://api.slotify.club/api/v1/groups/categories/")
      .then((res) => {
        const results = res.data.results;
        setCategories(results);
        if (selectedCategoryId === -1) {
          const defaultCategory = results.at(-1);
          if (defaultCategory) setSelectedCategoryId(defaultCategory.id);
        }
      });
    // eslint-disable-next-line
  }, []);

  function onImageChange(imageSrc: string, fileName: string) {
    setImageSrc(imageSrc);
    setImageFileName(fileName);
  }

  function onSubmitButtonClick() {
    var hasError = false;
    if (!name) {
      setNameError("Please enter a group name");
      hasError = true;
    }
    if (!description) {
      setDescriptionError("Please enter a group description");
      hasError = true;
    }
    const category = categories.find(
      (category) => category.id === selectedCategoryId
    );
    if (!category) {
      setCategoryError("Please select a category for your group");
      hasError = true;
    }
    if (hasError) return;

    setNameError("");
    setDescriptionError("");
    setCategoryError("");

    onSubmit({
      name,
      description,
      categoryId: category!.id,
      categoryName: category!.name,
      imgBlob: imageSrc,
      imgFileName: imageFileName,
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
        errorValue={descriptionError}
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
                onClick={() => setSelectedCategoryId(category.id)}
              />
            );
          })}
        </div>
        {categoryError && (
          <p className="text-left mx-1 text-red-500 text-sm italic">
            * {categoryError}
          </p>
        )}
      </div>
      <ImageUploadInput
        imgSrc={imageSrc}
        onImgSrcChange={onImageChange}
        promptText="Upload Banner"
        className="m-3"
      />
      <IonButton onClick={onSubmitButtonClick} className="w-5/6 my-5">
        {submitButtonLabel}
      </IonButton>
    </IonList>
  );
};

export default GroupForm;
