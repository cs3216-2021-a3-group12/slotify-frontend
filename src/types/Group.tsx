export interface StrippedGroup {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  banner_url: string;
}

export interface DetailedGroup {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  banner_url: string;
  members: {
    id: number;
    username: string;
  }[];
}

export type CreateGroupDetails = {
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  imgBlob?: string;
  imgFileName?: string;
};
