/*
 * @Author: Klien
 * @Date: 2021-07-17 21:43:26
 * @LastEditTime: 2021-07-20 14:05:59
 * @LastEditors: Klien
 */
import React from "react";

import { Button } from "../src/button";

export default { title: "Button" };

export const primary = () => (
  <Button onClick={() => console.log("123")}> Hello 111111 Button</Button>
);
