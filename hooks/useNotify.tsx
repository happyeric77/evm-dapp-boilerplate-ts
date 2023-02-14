import { createContext, Dispatch, SetStateAction, useContext } from "react";
export interface INotify {
  status: EAlertStatus;
  title: string;
  description?: string;
  showIcon?: boolean;
}

export enum EAlertStatus {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error",
}

export interface INotifyContext {
  setNotify: Dispatch<SetStateAction<INotify>>;
  notify: INotify;
}

export const NotifyContext = createContext<INotifyContext>({} as INotifyContext);

export function useNotify(): INotifyContext {
  return useContext(NotifyContext);
}
