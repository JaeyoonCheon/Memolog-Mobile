declare module 'chart' {
  export interface TagList {
    id: string;
    name: string;
  }
  export interface TagListChartProps {
    data: TagList[];
    title: string;
  }
}
