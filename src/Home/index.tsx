import { useState, useEffect } from "react";
import {
    IonButtons,
    IonContent,
    IonMenuButton,
    IonSlide,
    IonSlides,
    IonTitle,
    IonToolbar,
    IonPage,
    IonHeader,
} from "@ionic/react";
import EventCard, { Event } from "./EventCard";
import GroupCard, { Group } from "./GroupCard";
import { openSideMenu } from "../Components/SideMenu";

function Home() {
    const [name, setName] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    useEffect(() => {
        setName("User Name");
        setEvents([
            {
                id: "id-1",
                name: "Event Name 1",
                datetime: "Time 1",
                location: "Location 1",
                imgUrl: "https://picsum.photos/200",
            },
            {
                id: "id-2",
                name: "Event Name 2",
                datetime: "Time 2",
                location: "Location 2",
                imgUrl: "https://picsum.photos/200",
            },
            {
                id: "id-3",
                name: "Event Name 3",
                datetime: "Time 3",
                location: "Location 3",
                imgUrl: "https://picsum.photos/200",
            },
        ]);
        setGroups([
            {
                id: "id-1",
                name: "Group Name 1",
                categoryId: "cid-1",
                category: "Category 1",
                imgUrl: "https://picsum.photos/200",
            },
            {
                id: "id-2",
                name: "Group Name 2",
                categoryId: "cid-2",
                category: "Category 2",
                imgUrl: "https://picsum.photos/200",
            },
        ]);
    }, []);
    return (
        <IonPage id="main">
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons className="">
                        <IonMenuButton
                            autoHide={false}
                            onClick={openSideMenu}
                        />
                    </IonButtons>
                </IonToolbar>
                <IonToolbar color="primary" className="rounded-b-3xl">
                    <IonTitle size="large" className="w-full text-2xl">
                        Hello, {name}!
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true} scrollEvents={true}>
                <div className="h-80 flex flex-col">
                    <div className="p-3 h-12">
                        <span className="text-xl">Your Events</span>
                    </div>
                    <IonSlides
                        scrollbar={true}
                        options={{ slidesPerView: "auto" }}
                    >
                        {events.map((event) => {
                            return (
                                <IonSlide
                                    key={event.id}
                                    className="w-2/3 h-auto mt-2 mb-4"
                                >
                                    <EventCard event={event} />
                                </IonSlide>
                            );
                        })}
                    </IonSlides>
                </div>

                <div className="h-80 w-screen flex flex-col">
                    <div className="p-3 h-12">
                        <span className="text-xl">Your Groups</span>
                    </div>
                    {groups.map((group) => {
                        return <GroupCard key={group.id} group={group} />;
                    })}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;
