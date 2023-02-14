import classes from "./spinner.module.css";
import { AiOutlineLoading } from "react-icons/ai";

import React from "react";

export default function Spinner() {
  return (
    <div className={classes.spinner}>
      <span>
        <AiOutlineLoading />
      </span>
    </div>
  );
}
