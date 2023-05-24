import React, { useState } from "react";
import { BtcAddressListContextProvider } from "../../context/btc-context";
import BtcAddress from "../components/BtcAddress";
import BtcAddressList from "../components/BtcAddressList";
import BtcTransaction from "../components/BtcTransaction";

function Btc() {
  return (
    <BtcAddressListContextProvider>
      <BtcAddressList />
      <BtcAddress />
      <BtcTransaction />
    </BtcAddressListContextProvider>
  );
}
export default Btc;
