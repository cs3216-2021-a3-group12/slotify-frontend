import { useState, useEffect } from "react";
import { IonContent, IonSlide } from "@ionic/react";
import { Member } from "../types/Member";
import GroupMemberCard from "./GroupMemberCard";

function GroupEvents() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    setIsAdmin(true);
    setMembers([
      {
        userId: 1,
        name: "John Major",
        tagId: 1,
        tagName: "Admin",
        isAdmin: false,
      },
      {
        userId: 2,
        name: "Ed Sheeran",
        tagId: 2,
        tagName: "Junior",
        isAdmin: false,
      },
      {
        userId: 3,
        name: "Ariana Grande",
        tagId: 3,
        tagName: "Senior",
        isAdmin: false,
      },
    ]);
  }, []);
  return (
    <IonContent>
      <div className="flex flex-col ">
        {members.map((member) => {
          return (
            <IonSlide key={member.userId}>
              <GroupMemberCard isAdmin={isAdmin} member={member} />
            </IonSlide>
          );
        })}
      </div>
    </IonContent>
  );
}

export default GroupEvents;
