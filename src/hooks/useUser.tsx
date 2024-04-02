"use client";

import { createContext, useContext, useState } from "react";
import { User } from '@/db_types'

interface UserContextType {
  user: User | null,
  isLoading: boolean,
}

export const UserContext = createContext < UserContextType | undefined > (
  undefined
);

export interface Props {
  [propsName: string]: any;
}

export const UserContextProvider = ({ ...props }: Props) => {
  const [user, setUser] = useState < User | null > (null);
  const [isLoading, setIsLoading] = useState < boolean > (false)

  return (
    <UserContext.Provider value={{ user, isLoading }} {...props} />
  )
}

export const UseUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider');
  }

  return context;
}