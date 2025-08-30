import { GetUsersResponse, PaginatedRequest, User } from "@/graphql/types";
import { userClient } from "@/utils/client";

export async function getUsers(
  paginatedRequest: PaginatedRequest
): Promise<GetUsersResponse> {
  const { limit, page } = paginatedRequest;
  return new Promise((resolve, reject) => {
    userClient.getUsers(
      { limit: limit ?? 10, page: page ?? 1 },
      (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log("Response:", response, err);
          resolve(response);
        }
      }
    );
  });
}
