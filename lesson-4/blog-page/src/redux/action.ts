import { Dispatch, Action } from 'redux';
import axios from 'axios';
import { IHomeState, IArticleState } from './state';

export enum EActionType {
  HOME_LOAD = 'HOME_LOAD',
  ARTICLE_LOAD = 'ARTICLE_LOAD',
  ARTICLE_CLEAR = 'ARTICLE_CLEAR',
}

export interface IAction<TType = any, TPayload = any> extends Action<TType> {
  payload: TPayload;
}

export const createHomeLoadAction = () => async (
  dispatch: Dispatch<IAction<EActionType, IHomeState>>,
) => {
  const res = await axios.get<IHomeState>(
    'https://easy-mock.com/mock/5ca37e9e088bc82578d2b338/bupt-demo/home-data',
  );
  dispatch({
    type: EActionType.HOME_LOAD,
    payload: res.data,
  });
};

export const createArticleLoadAction = (id: string) => async (
  dispatch: Dispatch<IAction<EActionType, IArticleState>>,
) => {
  const res = await axios.get<IArticleState>(
    'https://easy-mock.com/mock/5ca37e9e088bc82578d2b338/bupt-demo/article',
    {
      params: {
        id,
      },
    },
  );
  dispatch({
    type: EActionType.ARTICLE_LOAD,
    payload: res.data,
  });
};

export const createArticleClearAction = (): Action<EActionType> => ({
  type: EActionType.ARTICLE_CLEAR,
});
