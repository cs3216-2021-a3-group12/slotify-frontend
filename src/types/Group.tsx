export interface StrippedGroup {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  banner_url: string;
}

export type CreateGroupDetails = {
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  imgBlob?: string;
  imgFileName?: string;
};
