#!/usr/bin/env node
import { execSync } from "node:child_process";
import { platform } from "node:os";

const isWin = platform() === "win32";
const tsProto = isWin
  ? "./node_modules/.bin/protoc-gen-ts_proto.cmd"
  : "./node_modules/.bin/protoc-gen-ts_proto";

execSync(
  `protoc \
    --plugin=${tsProto} \
    --ts_proto_out=./src/generated \
    --ts_proto_opt=esModuleInterop=true,outputServices=grpc-js,useExactTypes=false \
    -I ./protos \
    ./protos/*.proto`,
  { stdio: "inherit" }
);
