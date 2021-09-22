import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { IonCard, IonChip, IonContent, IonIcon, IonList } from "@ionic/react";
import { addOutline } from "ionicons/icons";

import SearchBar from "../Components/SearchBar";
import Tag from "../Components/Tag";

import { StrippedGroup } from "../types/Group";
import { Category } from "../types/Category";
import groupPlaceholder from "../resources/group-placeholder.jpg";
import axios from "axios";

function ExploreGroups() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState<StrippedGroup[]>([]);
  const [displayedGroups, setDisplayedGroups] = useState<StrippedGroup[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get("https://api.slotify.club/api/v1/groups/categories/"),
      axios.get("https://api.slotify.club/api/v1/groups/"),
    ])
      .then(([categoriesRes, groupsRes]) => {
        setCategories(categoriesRes.data.results);
        setGroups(groupsRes.data.results);
        setDisplayedGroups(groupsRes.data.results);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!selectedCategories.length) {
      setDisplayedGroups(groups);
    } else {
      setDisplayedGroups(groupsInSelectedCategories());
    }
    // eslint-disable-next-line
  }, [selectedCategories, groups]);

  function onTapCategory(categoryId: number) {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((value) => value !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  }

  function searchGroups(text: string) {
    setDisplayedGroups(
      groupsInSelectedCategories().filter((group) =>
        Object.values(group).join(" ").includes(text)
      )
    );
  }

  function groupsInSelectedCategories() {
    return groups.filter((group) =>
      selectedCategories.includes(group.category.id)
    );
  }

  return (
    <Fragment>
      <IonList>
        <div>
          <SearchBar onSearch={searchGroups} />
        </div>

        <div className="whitespace-nowrap overflow-x-scroll py-2 mx-2">
          {categories.map((category, idx) => {
            return (
              <Tag
                key={idx}
                color={
                  selectedCategories.includes(category.id)
                    ? "primary"
                    : undefined
                }
                label={category.name}
                className="whitespace-nowrap"
                onClick={() => onTapCategory(category.id)}
              />
            );
          })}
        </div>
      </IonList>

      <IonContent>
        {displayedGroups.length ? (
          displayedGroups.map((group, idx) => {
            return (
              <Link to={`/groups/${group.id}`} key={idx}>
                <IonCard className="rounded-2xl h-32 w-auto mt-3 flex">
                  <div className="w-1/3">
                    <img
                      className="h-full w-full p-2 object-fill rounded-2xl"
                      alt="Group"
                      src={group.banner_url ?? groupPlaceholder}
                    />
                  </div>

                  <div className="w-2/3 h-full p-3">
                    <div className="h-1/2 flex items-center">
                      <p className="font-bold text-lg line-clamp-2">
                        {group.name}
                      </p>
                    </div>
                    <div className="h-1/2 p-0 flex items-center">
                      <Tag
                        color="primary"
                        label={group.category.name}
                        className="m-0"
                      />
                    </div>
                  </div>
                </IonCard>
              </Link>
            );
          })
        ) : (
          <div className="p-2">
            <Link to="/createGroup">
              <IonChip
                color="primary"
                className="border-2 border-indigo-500 border-dashed h-32 w-full m-auto"
              >
                <div className="flex flex-col items-center w-full">
                  <IonIcon size="large" icon={addOutline} className="p-2" />
                  <p className="text-lg text-center w-full">
                    Can't find a group? Create one!
                  </p>
                </div>
              </IonChip>
            </Link>
          </div>
        )}
      </IonContent>
    </Fragment>
  );
}

export default ExploreGroups;
