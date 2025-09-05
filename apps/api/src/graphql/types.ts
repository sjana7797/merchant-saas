export type Product = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  orgId: string;
};

export type ServerRequest = {
  server: Omit<Server, "id" | "createdAt" | "updatedAt">;
};

export type Server = {
  id: string;
  name: string;
  description?: string | null;
  host: string;
  port: number;
  type: "grpc" | "rest" | "graphql";
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type GetUsersResponse = {
  users: User[];
  totalCount: number;
  page: number;
  nextCursor?: number;
};

export type GetServerHealthReponse = {
  message: string;
};

export type GetProductRequest = {
  productId: string;
};

export type PaginatedRequest = {
  limit?: number;
  page?: number;
};

export type ServerStatusResponse = {
  status: boolean;
};

export type ServerStatusRequest = {
  id: string;
};

export type GetCartRequest = {
  userId: string;
  orgId: string;
  cartId: string;
};
