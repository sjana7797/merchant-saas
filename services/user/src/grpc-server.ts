import { Server, ServerCredentials, status } from "@grpc/grpc-js";
import { UserServiceServer, UserServiceService } from "@merchant/proto/user";
import { db } from "@merchant/db";
import { customers, users } from "@merchant/db/schema/auth-schema";
import { and, count, eq } from "@merchant/db/lib";

const impl: UserServiceServer = {
  async getUsers(call, callback) {
    const { limit, page, orgId } = call.request;

    const take = limit + 1;
    const skip = (page - 1) * limit;

    const usersQuery = db
      .select()
      .from(customers)
      .where(eq(customers.orgId, orgId))
      .leftJoin(users, eq(customers.userId, users.id))
      .limit(take)
      .offset(skip);

    const totalCountQuery = db
      .select({ count: count() })
      .from(customers)
      .where(eq(customers.orgId, orgId));

    const [usersResponse, totalCountResponse] = await Promise.allSettled([
      usersQuery,
      totalCountQuery,
    ]);

    if (
      usersResponse.status === "rejected" ||
      totalCountResponse.status === "rejected"
    ) {
      callback(
        {
          cause: "Database query failed",
          code: status.INTERNAL,
        },
        null
      );
      return;
    }

    if (usersResponse.value.length === 0) {
      callback(null, {
        users: [],
        totalCount: 0,
        page: 1,
        nextCursor: undefined,
      });
    }

    let nextCursor: number | undefined;
    let usersData = usersResponse.value;

    if (usersData.length > limit) {
      nextCursor = page + 1;
      usersData = usersData.slice(0, limit);
    }

    callback(null, {
      page,
      nextCursor,
      totalCount: totalCountResponse.value?.at(0)?.count ?? 0,
      users: usersData.map((user) => ({
        createdAt: user.customers?.createdAt.toDateString(),
        updatedAt:
          user.users?.updatedAt.toDateString() ??
          user.customers?.updatedAt.toDateString(),
        id: user.customers?.userId,
        name: user.users?.name ?? "",
        email: user.users?.email ?? "",
      })),
    });
  },

  async getUser(call, callback) {
    const { userId, orgId } = call.request;

    const userResult = await db
      .select()
      .from(customers)
      .leftJoin(users, eq(customers.userId, users.id))
      .where(and(eq(customers.orgId, orgId), eq(customers.userId, userId)))
      .limit(1);

    if (userResult.length === 0) {
      callback(
        {
          message: "User not found",
          code: status.NOT_FOUND,
        },
        null
      );
    }

    const user = userResult[0];

    callback(null, {
      createdAt: user.customers?.createdAt.toDateString(),
      updatedAt:
        user.users?.updatedAt.toDateString() ??
        user.customers?.updatedAt.toDateString(),
      id: user.customers?.userId,
      name: user.users?.name ?? "",
      email: user.users?.email ?? "",
    });
  },
};

export function startGrpcServer(port = 50053) {
  const server = new Server();
  server.addService(UserServiceService, impl);
  server.bindAsync(
    `0.0.0.0:${port}`,
    ServerCredentials.createInsecure(),
    (err, bindPort) => {
      if (err) throw err;
      console.log(`🟢 Ecom gRPC server started on ${bindPort}`);
    }
  );
}
