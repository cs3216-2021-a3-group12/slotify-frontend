import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import {
  paperPlaneOutline,
  mailOutline,
  locationOutline,
} from "ionicons/icons";
import { StrippedEvent } from "../types/Event";
import { Member } from "../types/Member";
import Tag from "../Components/Tag";

function GroupMemberCard({
  isAdmin,
  member,
}: {
  isAdmin: boolean;
  member: Member;
}) {
  return (
    <IonCard className="rounded-2xl w-5/6 h-1/3 mt-3 flex justify-between">
      <IonCardHeader className="text-left px-2 py-0 truncate">
        <div className="flex content-between">
          <div className="w-1/2 flex flex-col p-3">
            <IonCardTitle className="truncate text-base">
              {member.name}
            </IonCardTitle>
            <IonCardSubtitle>A0123456X</IonCardSubtitle>
            <IonCardSubtitle>E0123456</IonCardSubtitle>
          </div>
          <div className="flex items-center">
            <IonCardSubtitle className="flex flex-col items-center">
              <IonButton size="small" fill="clear">
                {/* TODO: disable the button if the user doesn't have telegram handle */}
                <IonIcon icon={paperPlaneOutline} className="m-1" />
              </IonButton>
              <IonButton size="small" fill="clear">
                <IonIcon icon={mailOutline} className="m-1" />
              </IonButton>
            </IonCardSubtitle>
            <div className="flex flex-col">
              <Tag color="primary" label={member.tagName} />
              {isAdmin && (
                <IonButton size="small" color="danger">
                  Remove
                </IonButton>
              )}
            </div>
          </div>
        </div>
      </IonCardHeader>
    </IonCard>
  );
}

export default GroupMemberCard;
