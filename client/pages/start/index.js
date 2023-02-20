import React, { Fragment, useState } from "react";
import Start from "../../components/start/Start";
import Wallet from "../../components/start/Wallet";

export default function Index() {
  const [screen, setScreen] = useState("start");
  let displayScreen;
  if (screen === "start") {
    displayScreen = <Start setScreen={setScreen} />;
  } else if (screen === "wallet") {
    displayScreen = <Wallet setScreen={setScreen} />;
  }
  return <Fragment>{displayScreen}</Fragment>;
}
