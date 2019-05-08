import { IContentInfo } from '../types/type';

export interface IHomeState {
  topics: IContentInfo[];
  newTopics: IContentInfo[];
}

export interface IArticleState {
  id?: string;
  title?: string;
  content?: string;
  author?: string;
}

export interface IFullState {
  home: IHomeState;
  article: IArticleState;
}
