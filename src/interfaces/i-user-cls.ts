import { ClsStore } from 'nestjs-cls';

export interface IUserCls extends ClsStore {
  userId: string;
}
