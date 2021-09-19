import { useState, useEffect } from "react";
import { IonContent } from "@ionic/react";
import { Member } from "../types/Member";
import GroupMemberCard from "./GroupMemberCard";
import SearchBar from "../Components/SearchBar";

function GroupEvents() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [displayedMembers, setDisplayedMembers] = useState<Member[]>([]);
  function searchMembers(text: string) {
    setDisplayedMembers(
      members.filter((member) => Object.values(member).join(" ").includes(text))
    );
  }

  useEffect(() => {
    setIsAdmin(true);
    setMembers(testMembers);
    setDisplayedMembers(testMembers);
  }, []);
  return (
    <IonContent>
      <div className="flex flex-col items-center">
        <SearchBar onSearch={searchMembers} />
        {displayedMembers.map((member) => {
          return <GroupMemberCard isAdmin={isAdmin} member={member} />;
        })}
      </div>
    </IonContent>
  );
}

export default GroupEvents;

const testMembers = [
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
];
