import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "index.ts",
    output: {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: [".ts", ".js"],
      }),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-typescript"],
        extensions: [".ts"],
        exclude: "node_modules/**",
      }),
    ],
  },
  {
    input: "index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];
