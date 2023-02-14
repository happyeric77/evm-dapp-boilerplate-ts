import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface ILoading {
  tip?: string;
  title?: string;
  description?: string;
  isShown: boolean;
}

interface ILoadingContext {
  loading: ILoading;
  setLoading: Dispatch<SetStateAction<ILoading>>;
}

const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

const useLoading = () => useContext(LoadingContext);

export default LoadingContext;
export { useLoading };
