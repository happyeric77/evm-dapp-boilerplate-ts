import { Web3ContextProvider } from "evm-web3-hooks";
import { FC, useEffect, useState } from "react";
import LoadingContext, { ILoading } from "./useLoading";
import { EAlertStatus, INotify, NotifyContext } from "./useNotify";
interface Props {
  children: React.ReactNode;
}

export const AppContext: FC<Props> = ({ children }) => {
  const [notify, setNotify] = useState<INotify>({} as INotify);
  const [loading, setLoading] = useState<ILoading>({} as ILoading);

  useEffect(() => {
    if (notify?.status) {
      setTimeout(() => {
        setNotify({} as INotify);
      }, 5000);
    }
  }, [notify]);

  return (
    <Web3ContextProvider>
      <NotifyContext.Provider value={{ notify, setNotify }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>
      </NotifyContext.Provider>
    </Web3ContextProvider>
  );
};
