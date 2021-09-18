export interface StrippedGroup {
  id: string;
  name: string;
  categoryId: number;
  category: string;
  imgUrl: string;
}

export type CreateGroupDetails = {
  name: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  imgBlob?: string;
};
