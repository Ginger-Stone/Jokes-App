import React, { createContext, useState, ReactNode } from "react";
import { JokesPaginate, initialPaginateState } from "../types/jokeInterfaces";

export interface CurrentPageLimitContextType {
  currentPageLimit: JokesPaginate;
  UpdatePageLimit?: (value: JokesPaginate) => void;
}

export const initialPaginateStateContext: CurrentPageLimitContextType = {
  currentPageLimit: initialPaginateState,
};
export const CurrentPageLimitContext =
  createContext<CurrentPageLimitContextType>(initialPaginateStateContext);

interface CurrentPageLimitProviderProps {
  children: ReactNode;
}

export const CurrentPageLimitContextProvider = ({
  children,
}: CurrentPageLimitProviderProps) => {
  const [currentPageLimit, setCurrentPageLimit] =
    useState<JokesPaginate>(initialPaginateState);

  const UpdatePageLimit = (value: JokesPaginate) => {
    setCurrentPageLimit(value);
  };

  return (
    <CurrentPageLimitContext.Provider
      value={{ currentPageLimit, UpdatePageLimit }}
    >
      {children}
    </CurrentPageLimitContext.Provider>
  );
};
