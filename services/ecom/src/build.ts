async function build() {
  console.log("Building...");
  await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "dist",
    minify: true,
    target: "bun",
    sourcemap: true,
    format: "esm",
  });
  console.log("Built!");
}

build();
