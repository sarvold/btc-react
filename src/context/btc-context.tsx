import React, { createContext, PropsWithChildren, useState } from "react";

export interface BtcAddressListContextType {
  addresses: string[] | null;
  populateAddresses: (_addresses: string[]) => void; // React.Dispatch<React.SetStateAction<string[] | null>>;
}

export const BtcAddressListContext = createContext<BtcAddressListContextType>({
  addresses: null,
  populateAddresses: (_addresses) => {},
});

// See React 18 types: https://stackoverflow.com/a/71800185/8430632
export const BtcAddressListContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [addresses, setAddresses] = useState<string[] | null>(null);
  const addressesHandler = (addresses: string[]) => {
    setAddresses(addresses);
  };

  const contextValue: BtcAddressListContextType = {
    addresses,
    populateAddresses: addressesHandler,
  };
  return (
    <BtcAddressListContext.Provider value={contextValue}>{children}</BtcAddressListContext.Provider>
  );
};
