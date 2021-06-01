import NewsListItem from "./NewsListItem";

export default interface NewsList {
  category: string;
  categoryTitle: string;
  items: Array<NewsListItem>;
  pagination: {
    totalPages: number;
    currentPage: number;
  };
}
