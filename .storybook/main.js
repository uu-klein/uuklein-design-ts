/*
 * @Author: Klien
 * @Date: 2021-07-18 14:16:44
 * @LastEditTime: 2021-07-20 12:55:10
 * @LastEditors: Klien
 */
const path=require('path');
module.exports = {
  "stories": [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss"
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../packages/"),
    });
    return config;
  },
}