import type { output, ZodType } from "zod";

type RequestParserParams<T> = {
  zodObject: T;
  request: object;
};

type RequestParserResult<T> =
  | {
      success: true;
      data: output<T>;
    }
  | {
      success: false;
      error: string;
    };

export class RequestUtil {
  static parse<T extends ZodType>(
    params: RequestParserParams<T>,
  ): RequestParserResult<T> {
    const { zodObject, request } = params;

    const parsedRequestResult = zodObject.safeParse(request);

    if (!parsedRequestResult.success) {
      return {
        success: false,
        error: parsedRequestResult.error.issues
          .map((issue) => issue.message)
          .join(", "),
      };
    }

    return {
      success: true,
      data: parsedRequestResult.data,
    };
  }
}
