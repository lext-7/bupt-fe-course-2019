import { IAction, EActionType } from './action';
import { IHomeState, IArticleState } from './state';

const handleHomeLoad = (
  state: IHomeState,
  action: IAction<EActionType, IHomeState>,
): IHomeState => {
  return {
    ...state,
    ...action.payload,
  };
};

export function homeReducer(
  state: IHomeState = {
    topics: [],
    newTopics: [],
  },
  action: IAction<EActionType>,
) {
  switch (action.type) {
    case EActionType.HOME_LOAD:
      return handleHomeLoad(state, action);
    default:
      return state;
  }
}

const handleArticleLoad = (
  state: IArticleState,
  action: IAction<EActionType>,
): IArticleState => {
  return {
    ...state,
    ...action.payload,
  };
};

const handleArticleClear = (
  state: IArticleState,
  action: IAction<EActionType>,
): IArticleState => {
  return {};
};

export function articleReducer(
  state: IArticleState = {},
  action: IAction<EActionType>,
) {
  switch (action.type) {
    case EActionType.ARTICLE_LOAD:
      return handleArticleLoad(state, action);
    case EActionType.ARTICLE_CLEAR:
      return handleArticleClear(state, action);
    default:
      return state;
  }
}
