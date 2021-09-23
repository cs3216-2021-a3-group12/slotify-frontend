import { useState } from "react";
import { IonContent } from "@ionic/react";
import { Member } from "../types/Member";
import GroupMemberCard from "./GroupMemberCard";
import SearchBar from "../Components/SearchBar";
import { DetailedGroup } from "../types/Group";

export interface GroupMemberProps {
  group: DetailedGroup;
}

const GroupMember: React.FC<GroupMemberProps> = ({ group }) => {
  const [members] = useState<Member[]>(group.members);
  const [displayedMembers, setDisplayedMembers] = useState<Member[]>(
    group.members
  );
  function searchMembers(text: string) {
    setDisplayedMembers(
      members.filter((member) => Object.values(member).join(" ").includes(text))
    );
  }
  return (
    <IonContent>
      <div className="flex flex-col items-center">
        <SearchBar onSearch={searchMembers} />
        {displayedMembers.map((member) => {
          return (
            <GroupMemberCard
              isAdmin={group.is_admin}
              member={member}
              key={member.id}
              group={group}
            />
          );
        })}
      </div>
    </IonContent>
  );
};

export default GroupMember;
