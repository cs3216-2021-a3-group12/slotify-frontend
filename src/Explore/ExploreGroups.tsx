import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonLabel,
    IonCardTitle,
    IonContent,
    IonList,
    IonInfiniteScroll,
    IonHeader,
} from "@ionic/react";
import { useState, useEffect, Fragment } from "react";
import { StrippedGroup } from "../types/Group";
import SearchBar from "./SearchBar";

export interface ExploreGroupsProps {}

function ExploreGroups() {
    const [groups, setGroups] = useState<StrippedGroup[]>([]);

    useEffect(() => {
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
            {
                id: "id-2",
                name: "Group Name 2",
                categoryId: "cid-2",
                category: "Category 2",
                imgUrl: "https://picsum.photos/200",
            },
            {
                id: "id-2",
                name: "Long long long long ong long long ong long long ong long long ong long long ong long long ong long long long name",
                categoryId: "cid-2",
                category: "Category 2",
                imgUrl: "https://picsum.photos/200",
            },
            {
                id: "id-2",
                name: "Group Name 2",
                categoryId: "cid-2",
                category: "Category 2",
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
        <Fragment>
            <div>
                <SearchBar />
            </div>
            <IonContent>
                {groups.map((group) => {
                    return (
                        <IonCard className="explore-group-card">
                            <div className="explore-group-card-img-div">
                                <img
                                    className="explore-group-card-img"
                                    alt="Group"
                                    src={group.imgUrl}
                                />
                            </div>

                            <div className="explore-group-card-text-div">
                                <IonCardHeader className="explore-group-card-header">
                                    <IonCardTitle className="explore-group-card-name">
                                        {group.name}
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent className="explore-group-card-content">
                                    <IonChip color="primary">
                                        <IonLabel color="primary">
                                            {group.category}
                                        </IonLabel>
                                    </IonChip>
                                </IonCardContent>
                            </div>
                        </IonCard>
                    );
                })}
            </IonContent>
        </Fragment>
    );
}

export default ExploreGroups;
