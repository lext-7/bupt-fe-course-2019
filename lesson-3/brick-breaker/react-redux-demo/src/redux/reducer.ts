import { IAction, EActionType } from './action';

export interface IState {
  count: number;
}

const handleIncrease = (
  state: IState,
  action: IAction<EActionType, number>,
): IState => {
  return {
    ...state,
    count: state.count + action.payload!,
  };
};

const handleReset = (state: IState, action: IAction<EActionType>): IState => {
  return {
    count: 0,
  };
};

export default function(
  state: IState = { count: 0 },
  action: IAction<EActionType>,
) {
  switch (action.type) {
    case EActionType.INCREMENT:
      return handleIncrease(state, action);
    case EActionType.RESET:
      return handleReset(state, action);
  }
  return state;
}
