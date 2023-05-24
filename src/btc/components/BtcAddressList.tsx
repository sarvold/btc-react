import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { BtcAddressListContext } from '../../context/btc-context';
import { UiSectionHeader } from '../../ui-components/UiSectionHeader';

function BtcAddressList() {
  const btcCtx = useContext(BtcAddressListContext);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get<string[]>(
        'http://localhost:3000/blockchain/addresses'
      );
      // I know, this is redundant because we get a set of unique addresses already from the BE, but who knows...
      const uniqueAddresses: string[] = Array.from(new Set(data));
      btcCtx.populateAddresses(uniqueAddresses); // This way we ensure we can use the address as key
    }
    fetchData();
  }, []);

  // const handleButtonClick = (address: string) => {
  //   // handle button click for each address
  //   console.log('clicked ', address);
  // };

  return (
    <>
      <UiSectionHeader text="BTC addresses involved in recent transactions" />
      <ol>
        {btcCtx.addresses?.map((addr) => (
          <li key={addr}>
            {addr}
          </li>
        ))}
      </ol>
    </>
  );
}
export default BtcAddressList;
