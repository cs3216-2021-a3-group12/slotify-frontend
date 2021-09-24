import { IonCard } from "@ionic/react";
import Tag from "../Components/Tag";
import { StrippedGroup } from "../types/Group";

function GroupCard({ group }: { group: StrippedGroup }) {
  return (
    <IonCard className="rounded-2xl w-auto h-24 mt-3 flex justify-between">
      <div className="h-full w-1/3">
        <img
          className="h-full w-full p-2 object-cover rounded-2xl"
          alt="Group"
          src={
            group.banner_url ||
            "https://api.slotify.club/media/groups/group-default.jpg"
          }
        />
      </div>

      <div className="w-2/3 h-full p-3">
        <div className="h-1/2 flex items-center">
          <p className="font-bold line-clamp-2">{group.name}</p>
        </div>
        <div className="h-1/2 p-0 flex items-center">
          <Tag color="primary" label={group.category.name} className="m-0" />
        </div>
      </div>
    </IonCard>
  );
}

export default GroupCard;
