#!/usr/bin/env node
/*
 * @Author: Klien
 * @Date: 2021-07-16 22:20:12
 * @LastEditTime: 2021-07-17 16:05:46
 * @LastEditors: Klien
 */
import json from 'rollup-plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { terser } from "rollup-plugin-terser";
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import clear from 'rollup-plugin-clear'

const rollup = require("rollup");
const path = require("path");
const currentWorkingPath = process.cwd();
const { src, name } = require(path.join(currentWorkingPath, "package.json"));
const input = path.join(currentWorkingPath, src);
const fileName = name.replace("@uuklein/", "");
const env = process.env.NODE_ENV;
const external = ["react", "react-dom", "redux"];
const paths = {
    "react": '//cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js',
    "react-dom": '//cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
    'redux': '//cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js',
};
const globals = {
    "react": "React",
    "react-dom": "ReactDOM",
    'redux': 'Redux',
};
const plugins = [
    nodeResolve(),
    commonjs(),
    json(),
    typescript(),
    clear({
        targets: ['dist'],
    }),
    babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
    postcss({
        modules: false,
        minimize: env === 'production' ? true : false,
        extract: true,
        plugins: [
            cssnano(),
        ]
    }),
    terser(),
    replace({
        'process.env.NODE_ENV': JSON.stringify(env),
        'preventAssignment': true,
    }),
    filesize(),
];
const inputOptions = {
    input,
    external,
    plugins,
};
const outputOptions = [
    {
        file: `dist/${fileName}.cjs.js`,
        format: "cjs",
        name: `${fileName}`,
        globals,
        paths,
    },
    {
        file: `dist/${fileName}.esm.js`,
        format: "esm",
        name: `${fileName}`,
        globals,
        paths,
    },
    {
        file: `dist/${fileName}.umd.js`,
        format: "umd",
        name: `${fileName}`,
        globals,
        paths,
    },
];
async function build() {
    const bundle = await rollup.rollup(inputOptions);
    outputOptions.forEach(async (options) => {
        await bundle.write(options);
    });
}
build();
