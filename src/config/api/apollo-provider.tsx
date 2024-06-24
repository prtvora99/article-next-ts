// src/components/ApolloProvider.tsx
"use client";

import client from "@/src/config/api/client";
import { ApolloProvider as Provider } from "@apollo/client";
import { ReactNode } from "react";

const ApolloProvider = ({ children }: { children: ReactNode }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
