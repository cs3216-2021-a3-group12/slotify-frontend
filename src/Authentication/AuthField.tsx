import { TextFieldTypes } from "@ionic/core";
import { IonIcon, IonInput, IonItem } from "@ionic/react";

type AuthFieldProps = {
  type?: TextFieldTypes;
  icon: string;
  value: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const AuthField: React.FC<AuthFieldProps> = ({
  type = undefined,
  icon,
  value,
  placeholder,
  setValue,
}) => {
  return (
    <IonItem className="mx-5 my-6">
      <IonIcon slot="start" icon={icon} />

      <IonInput
        type={type}
        value={value}
        placeholder={placeholder}
        onIonChange={(e) => setValue(e.detail.value!)}
      ></IonInput>
    </IonItem>
  );
};

AuthField.defaultProps = {
  type: undefined,
};

export default AuthField;
