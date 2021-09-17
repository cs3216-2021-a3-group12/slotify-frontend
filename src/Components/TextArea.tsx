import { TextareaChangeEventDetail } from "@ionic/core";
import { IonIcon, IonItem, IonTextarea } from "@ionic/react";

type TextAreaProps = {
  outline?: boolean;
  icon: string;
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  outline = false,
  icon,
  value,
  placeholder,
  onValueChange,
}) => {
  function onChange(event: CustomEvent<TextareaChangeEventDetail>) {
    const text = event.detail.value as string;
    if (text !== undefined) {
      onValueChange(text);
    }
  }
  return (
    <IonItem
      className={`m-3 ${outline ? "border-gray-200 border-2 rounded-xl" : ""}`}
    >
      <IonIcon slot="start" icon={icon} />
      <IonTextarea
        value={value}
        placeholder={placeholder}
        onIonChange={onChange}
        rows={4}
      ></IonTextarea>
    </IonItem>
  );
};

export default TextArea;
