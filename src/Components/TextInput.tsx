import { TextFieldTypes } from "@ionic/core";
import { IonIcon, IonInput, IonItem } from "@ionic/react";
import { Fragment } from "react";

type TextInputProps = {
  type?: TextFieldTypes;
  outline?: boolean;
  errorValue?: string;
  icon: string;
  value: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const TextInput: React.FC<TextInputProps> = ({
  type = undefined,
  outline = false,
  errorValue,
  icon,
  value,
  placeholder,
  setValue,
}) => {
  return (
    <Fragment>
      <div className="m-3">
        <IonItem
          className={`${outline ? "border-gray-200 border-2 rounded-xl" : ""}`}
        >
          <IonIcon slot="start" icon={icon} />

          <IonInput
            type={type}
            value={value}
            placeholder={placeholder}
            onIonChange={(e) => setValue(e.detail.value!)}
          ></IonInput>
        </IonItem>
        {errorValue && (
          <p className="text-left mx-1 text-red-500 text-sm italic">
            * {errorValue}
          </p>
        )}
      </div>
    </Fragment>
  );
};

TextInput.defaultProps = {
  type: undefined,
  outline: false,
  errorValue: undefined,
};

export default TextInput;
