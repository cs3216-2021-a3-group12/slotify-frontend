import { IonChip, IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { ChangeEvent, useRef } from "react";

type ImageUploadInputProps = {
  color?: string;
  imgSrc?: string;
  onImgSrcChange?: (imgSrc: string, fileName: string) => void;
  promptText?: string;
  [other: string]: any;
};

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  imgSrc,
  promptText = "Upload an image",
  onImgSrcChange,
  ...props
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const files = (event.target as HTMLInputElement).files as FileList;
    if (files.length && onImgSrcChange) {
      onImgSrcChange(URL.createObjectURL(files[0]), files[0].name);
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
            {imgSrc ? (
              <img className="h-full" src={imgSrc} alt="uploaded banner" />
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
