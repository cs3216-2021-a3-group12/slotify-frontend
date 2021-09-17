import { IonChip, IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { ChangeEvent, useRef } from "react";

type ImageUploadInputProps = {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  promptText?: string;
  [other: string]: any;
};

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  value = "",
  promptText = "Upload an image",
  setValue = () => {},
  ...props
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const files = (event.target as HTMLInputElement).files as FileList;
    if (files.length) {
      console.log(URL.createObjectURL(files[0]));
      setValue(URL.createObjectURL(files[0]));
    }
  }

  return (
    <div className="w-full" {...props}>
      <input
        ref={fileInput}
        hidden
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />
      <IonChip
        outline={true}
        className="border-2 border-gray-200 border-dashed h-32 w-full m-auto"
        onClick={() => {
          if (fileInput.current) {
            const input = fileInput.current as HTMLInputElement;
            input.click();
          }
        }}
      >
        <div className="flex flex-col items-center w-full h-full">
          <div className="h-3/4">
            {value ? (
              <img className="h-full" src={value} alt="uploaded banner" />
            ) : (
              <IonIcon
                size="large"
                icon={imageOutline}
                className="p-2 h-full"
              />
            )}
          </div>
          <p className="text-lg text-center w-full">{promptText}</p>
        </div>
      </IonChip>
    </div>
  );
};

export default ImageUploadInput;
