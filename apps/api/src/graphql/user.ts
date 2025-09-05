import { GetUsersResponse, PaginatedRequest, User } from "@/graphql/types";
import { userClient } from "@/utils/client";
import { httpStatusCodes, Logger } from "@merchant/api-config";

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
          Logger.info({
            message: "Received GetUsers response",
            statusCode: httpStatusCodes.OK,
            details: response,
          });
          resolve(response);
        }
      }
    );
  });
}
