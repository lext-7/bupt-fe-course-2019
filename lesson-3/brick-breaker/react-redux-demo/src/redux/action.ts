export enum EActionType {
  INCREMENT = 'INCREMENT',
  RESET = 'RESET',
}

export interface IAction<TType = any, TPayload = any> {
  type: TType;
  payload?: TPayload;
}

export const createIncreaseAction = (
  delta: number = 1,
): IAction<EActionType, number> => ({
  type: EActionType.INCREMENT,
  payload: delta,
});

export const createResetAction = (): IAction<EActionType> => ({
  type: EActionType.RESET,
});
