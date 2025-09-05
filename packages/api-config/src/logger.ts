import * as httpStatusCodes from "./http-status-codes";

/* eslint-disable no-console */
const reset = "\x1b[0m"; // Reset color to default;

type LoggerParams = {
  message: string;
  statusCode: number;
  details?: unknown;
};

export class Logger {
  static error(params: LoggerParams): void {
    const { message, statusCode, details } = params;
    const timestamp = new Date().toISOString();
    const red = "\x1b[31m"; // Red color

    console.error(
      `[${timestamp}] ${red}ERROR:${reset}`,
      message,
      statusCode,
      details ? details : ""
    );
  }

  static success(params: LoggerParams) {
    const { message, statusCode, details } = params;

    const timestamp = new Date().toISOString();
    const green = "\x1b[32m"; // Green color

    console.log(
      `[${timestamp}] ${green}SUCCESS:${reset}`,
      message,
      statusCode,
      details ? details : ""
    );
  }

  static info(params: LoggerParams): void {
    const { message, statusCode, details } = params;

    const timestamp = new Date().toISOString();
    const blue = "\x1b[34m"; // Blue color

    console.log(
      `[${timestamp}] ${blue}INFO:${reset}`,
      message,
      statusCode,
      details ? details : ""
    );
  }

  static warn(params: LoggerParams): void {
    const { message, statusCode, details } = params;

    const timestamp = new Date().toISOString();
    const yellow = "\x1b[33m"; // Yellow color

    console.warn(
      `[${timestamp}] ${yellow}WARNING:${reset}`,
      message,
      statusCode,
      details ? details : ""
    );
  }
}
