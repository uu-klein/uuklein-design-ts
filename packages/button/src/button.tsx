/*
 * @Author: Klien
 * @Date: 2021-07-17 11:08:52
 * @LastEditTime: 2021-07-20 14:24:40
 * @LastEditors: Klien
 */
import React from "react";
import styles from "./button.scss";
import cx from "clsx";

interface IFButtonStyleProps {
  size?: "medium" | "small" | "mini";
  type?: "primary" | "success" | "warning" | "danger" | "info" | "text";
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: string;
  variant?: any;
}

const Button = ({ children, className, variant, ...rest }: any) => {
  const classes = cx(
    styles.Button,
    {
      [styles.ButtonSecondary]: variant === "secondary",
    },
    className
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

// interface IFButtonStyleProps {
//   size?: "medium" | "small" | "mini";
//   type?: "primary" | "success" | "warning" | "danger" | "info" | "text";
//   plain?: boolean;
//   round?: boolean;
//   circle?: boolean;
//   loading?: boolean;
//   disabled?: boolean;
//   className?: string;
//   children?: string;
//   variant?: any;
// }

// const Button = (props: IFButtonStyleProps) => {
//   const classes = cx(
//     styles.Button,
//     {
//       [styles.ButtonSecondary]: props.variant === "secondary",
//     },
//     props.className
//   );

//   return <button {...rest} className={classes}>{props.children}</button>;
// };

export { Button };
