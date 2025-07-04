import { NameSpace } from '../../constants/const.ts';
import { StateType } from '../../types/state.type.ts';

export const selectAuthorizationStatus = (state: StateType) =>
  state[NameSpace.User].authorizationStatus;
export const selectUserName = (state: StateType) =>
  state[NameSpace.User].userData?.name;
