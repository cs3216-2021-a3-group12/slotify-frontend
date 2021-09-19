import { InputChangeEventDetail, TextFieldTypes } from "@ionic/core";
import { IonIcon, IonInput, IonItem } from "@ionic/react";

type TextInputProps = {
  type?: TextFieldTypes;
  outline?: boolean;
  errorValue?: string;
  icon: string;
  value?: string;
  placeholder?: string;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
  inputProps?: React.ComponentProps<typeof IonInput>;
};

const TextInput: React.FC<TextInputProps> = ({
  type = undefined,
  outline = false,
  errorValue,
  icon,
  value,
  placeholder,
  onValueChange,
  inputProps = {},
}) => {
  function onChange(event: CustomEvent<InputChangeEventDetail>) {
    const text = event.detail.value as string;
    if (text !== undefined && onValueChange) {
      onValueChange(text);
    }
  }
  return (
    <div className="m-3">
      <IonItem
        className={`${outline ? "border-gray-200 border-2 rounded-xl" : ""}`}
      >
        <IonIcon slot="start" icon={icon} />

        <IonInput
          type={type}
          value={value}
          placeholder={placeholder}
          onIonChange={onChange}
          {...inputProps}
        ></IonInput>
      </IonItem>
      {errorValue && (
        <p className="text-left mx-1 text-red-500 text-sm italic">
          * {errorValue}
        </p>
      )}
    </div>
  );
};

TextInput.defaultProps = {
  type: undefined,
  outline: false,
  errorValue: undefined,
};

export default TextInput;
