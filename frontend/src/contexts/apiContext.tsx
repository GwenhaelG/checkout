import React, { useContext, useState } from 'react';

type ApiContextInterface = {
  host?: string;
};

type ApiProviderInterface = ApiContextInterface & {
  setHost?: (value: string) => void;
};

export const ApiCtx = React.createContext<ApiProviderInterface>({});
export const useApiContext = () => useContext(ApiCtx);
export const ApiProvider = (
  props: { children: React.ReactNode } & ApiContextInterface
) => {
  const [host, setHost] = useState<string>(
    props.host || 'http://localhost:3001'
  );
  return (
    <ApiCtx.Provider
      value={{
        host: host,
        setHost: (value: string) => setHost(value),
      }}
    >
      {props.children}
    </ApiCtx.Provider>
  );
};
