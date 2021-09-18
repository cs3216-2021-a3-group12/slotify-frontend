import { TextareaChangeEventDetail } from "@ionic/core";
import { IonIcon, IonItem, IonTextarea } from "@ionic/react";

type TextAreaProps = {
  outline?: boolean;
  errorValue?: string;
  icon: string;
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  textareaProps?: React.ComponentProps<typeof IonTextarea>;
};

const TextArea: React.FC<TextAreaProps> = ({
  outline = false,
  errorValue,
  icon,
  value,
  placeholder,
  onValueChange,
  textareaProps = {},
}) => {
  function onChange(event: CustomEvent<TextareaChangeEventDetail>) {
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
        <IonTextarea
          value={value}
          placeholder={placeholder}
          onIonChange={onChange}
          rows={4}
          {...textareaProps}
        ></IonTextarea>
      </IonItem>
      {errorValue && (
        <p className="text-left mx-1 text-red-500 text-sm italic">
          * {errorValue}
        </p>
      )}
    </div>
  );
};

export default TextArea;
