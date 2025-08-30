"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();
function ApiProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ApiProvider;
