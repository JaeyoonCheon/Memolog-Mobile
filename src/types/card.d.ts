declare module 'card' {
  export interface CardItemProps {
    id: number;
    title: string;
    form: string;
    nickname: string;
    thumbnail_url?: string;
    profile_image_url?: string;
  }
  export interface CardProps {
    item: CardItemProps;
    onPress: (k: number) => void;
  }
  export interface CardListProps {
    data: CardItemProps[];
    onPressCard: (k: number) => void;
    onEndReached: () => void;
    onRefresh: () => void;
    refreshing: boolean;
  }
}
