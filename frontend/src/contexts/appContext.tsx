import React, { useContext, useState, ComponentType } from 'react';
import Home from '../views/Home';

type LinksProps = {
  name: string;
  pathname: string;
  reqAuth: boolean;
  exact?: boolean;
  component: ComponentType;
};

type AppContextInterface = {
  mode: string | null;
  setMode: (value: string) => void;
  links: LinksProps[];
};

// Define your routes here
const links: LinksProps[] = [
  {
    name: 'Home',
    reqAuth: false,
    exact: true,
    pathname: '/',
    component: Home,
  },
];

export const AppCtx = React.createContext<AppContextInterface>({
  mode: 'light',
  setMode: () => {},
  links: [],
});
export const useAppContext = () => useContext(AppCtx);
export const AppProvider = (props: { children: React.ReactNode }) => {
  const [mode, setMode] = useState(
    localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light'
  );

  const handleSetMode = (value: string) => {
    setMode(value);
    localStorage.setItem('mode', value);
  };

  return (
    <AppCtx.Provider
      value={{
        mode,
        setMode: handleSetMode,
        links,
      }}
    >
      {props.children}
    </AppCtx.Provider>
  );
};
