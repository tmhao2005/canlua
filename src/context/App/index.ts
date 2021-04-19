import React from "react";
import {WeightValue} from "../../components/Weight";

interface AppContextType {
  weights: WeightValue[];
  setWeights?: (values: WeightValue[]) => any;
}

export const AppContext = React.createContext<AppContextType>({
  weights: [],
});
