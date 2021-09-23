import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonLabel,
  IonModal,
} from "@ionic/react";
import { paperPlaneOutline, mailOutline, createOutline } from "ionicons/icons";
import { Member } from "../types/Member";
import Tag from "../Components/Tag";
import { useEffect, useState } from "react";
import ManageMembership from "./ManageMembership";
import { DetailedGroup } from "../types/Group";
import { useAuthState } from "../AuthContext";
import { Membership } from "../types/Membership";

function GroupMemberCard({
  isAdmin,
  member,
  group,
}: {
  isAdmin: boolean;
  member: Member;
  group: DetailedGroup;
}) {
  const [showModal, setShowModal] = useState(false);
  const [membership, setMembership] = useState<Membership>();
  const userDetails = useAuthState();
  useEffect(() => {
    fetch(
      `https://api.slotify.club/api/v1/groups/${group.id}/memberships/?user=${member.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data.results)
      .then((data) => {
        const tagId = data[0].tag;
        if (tagId !== undefined) {
          switch (tagId) {
            case 1:
              data[0].tag = "Junior";
              break;
            case 2:
              data[0].tag = "Senior";
              break;
            default:
              data[0].tag = "No Tag";
          }
        }
        setMembership({ ...data[0] });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [member, group.id, userDetails.accessToken]);

  function removeMember() {
    if (membership) {
      fetch(
        `https://api.slotify.club/api/v1/groups/memberships/${membership.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userDetails.accessToken}`,
          },
        }
      )
        .then(() => {
          setShowModal(false);
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function updateMembership(newMembership: Membership) {
    if (membership === newMembership) {
      setShowModal(false);
      return;
    }

    let tag;
    if (newMembership.tag === "Junior") {
      tag = 1;
    } else if (newMembership.tag === "Senior") {
      tag = 2;
    } else {
      tag = null;
    }

    const requestBody: { is_admin: boolean; tag?: number } = {
      is_admin: newMembership.is_admin,
      tag: tag,
    };

    if (membership) {
      fetch(
        `https://api.slotify.club/api/v1/groups/memberships/${membership.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userDetails.accessToken}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      )
        .then((res) => res.json())
        .then(() => {
          setShowModal(false);
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleRequest(is_approved: boolean) {
    if (is_approved) {
      fetch(
        `https://api.slotify.club/api/v1/groups/memberships/${membership.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userDetails.accessToken}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ is_approved: is_approved }),
        }
      )
        .then((res) => res.json())
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // delete the join request to reject
      fetch(
        `https://api.slotify.club/api/v1/groups/memberships/${membership.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userDetails.accessToken}`,
          },
        }
      )
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <IonCard className="rounded-2xl w-5/6 h-1/3 mt-3">
      <IonCardHeader className="text-left px-1 py-0 truncate">
        <div className="flex justify-between">
          <div className="w-1/2 flex flex-col p-3">
            <IonCardTitle className="truncate text-base">
              {member.username}
            </IonCardTitle>
            {isAdmin && member.profile && (
              <>
                <IonCardSubtitle>
                  {member.profile.student_number}
                </IonCardSubtitle>
                <IonCardSubtitle>{member.profile.nusnet_id}</IonCardSubtitle>
              </>
            )}
          </div>

          <div className="flex items-center">
            {isAdmin && member.profile && (
              <IonCardSubtitle className="flex flex-col -ml-3">
                <IonButton
                  size="small"
                  fill="clear"
                  disabled={member.profile.telegram_handle === ""}
                >
                  <IonIcon icon={paperPlaneOutline} />
                </IonButton>
                <IonButton
                  size="small"
                  fill="clear"
                  href={`mailto:${member.email}`}
                  disabled={member.email === ""}
                >
                  <IonIcon icon={mailOutline} />
                </IonButton>
              </IonCardSubtitle>
            )}
            <IonCardSubtitle className="flex flex-col text-center m-2">
              <IonLabel>
                {member.is_admin
                  ? "Admin"
                  : member.is_approved
                  ? "Member"
                  : "Requested"}
              </IonLabel>

              {member.tag ? <Tag color="primary" label={member.tag} /> : null}
            </IonCardSubtitle>
            {isAdmin && !member.is_approved && (
              <>
                <IonButton
                  size="small"
                  color="success"
                  onClick={() => handleRequest(true)}
                >
                  Approve
                </IonButton>
                <IonButton
                  size="small"
                  color="danger"
                  onClick={() => handleRequest(false)}
                >
                  Reject
                </IonButton>
              </>
            )}
            {isAdmin && member.is_approved && (
              <IonButton
                fill="clear"
                size="large"
                className="-mx-4"
                onClick={() => setShowModal(true)}
              >
                <IonIcon icon={createOutline} />
              </IonButton>
            )}
          </div>
        </div>
      </IonCardHeader>
      {membership && isAdmin && (
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          swipeToClose={true}
        >
          <ManageMembership
            member={member}
            membership={membership}
            removeMember={removeMember}
            updateMembership={updateMembership}
            setShowModal={setShowModal}
          />
        </IonModal>
      )}
    </IonCard>
  );
}

export default GroupMemberCard;

