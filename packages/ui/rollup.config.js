import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "index.ts",
    output: {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    external: [
      "react",
      "react/jsx-runtime",
      "react-dom",
      "@vanilla-extract/css",
    ],
    plugins: [
      resolve({
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      }),
      vanillaExtractPlugin(),
      babel({
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
        extensions: [".ts", ".tsx"],
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
    external: [/\.css\.ts$/],
    plugins: [dts()],
  },
];
