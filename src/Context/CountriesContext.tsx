import React, { createContext, useState, Dispatch, SetStateAction, useContext } from "react";
import { Interface } from "readline";
import { RouteChildrenProps } from "react-router-dom";

//https://codesandbox.io/s/react-ts-complex-context-function-f1cv4?fontsize=14&hidenavigation=1&theme=dark&file=/src/index.tsx
interface IProps {
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
}

type ContextType = {
  context: any;
  setContext: any;
};

const CountriesContext = createContext<ContextType | undefined>(undefined);
export const useCountries = () => useContext(CountriesContext);

export const CountriesContextProvider = (props: IProps) => {
  const [context, setContext] = useState([]);

  return <CountriesContext.Provider value={{ context, setContext }}>{props.children}</CountriesContext.Provider>;
};
