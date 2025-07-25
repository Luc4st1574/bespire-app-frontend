"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apollo-client";
import { AppProvider } from "../context/AppContext";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            unstyled: true,
          }}
        />
      </AppProvider>
    </ApolloProvider>
  );
}