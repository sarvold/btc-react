import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  BtcAddressListContext,
  BtcAddressListContextType,
} from '../../context/btc-context';
import UiButton from '../../ui-components/UiButton';
import { UiSectionHeader } from '../../ui-components/UiSectionHeader';

function BtcAddressList() {
  const btcCtx = useContext<BtcAddressListContextType>(BtcAddressListContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<string[]>(
          'http://localhost:3000/blockchain/addresses'
        );
        if (response.status === 500) {
          throw new Error('Internal server error');
        }
        const uniqueAddresses: string[] = Array.from(new Set(response.data));
        btcCtx.populateAddresses(uniqueAddresses);
      } catch (error) {
        console.error(error);
        alert('Address search failed: ' + (error as Error).message);
      }
    }
    fetchData();
  }, []);

  const toggleListHandler = () => {
    setIsExpanded((prevState: boolean) => !prevState);
  };

  return (
    <>
      <UiSectionHeader text="BTC addresses involved in recent transactions" />

      <UiButton
        text={isExpanded ? 'Collapse' : 'Expand'}
        onClick={toggleListHandler}
      />
      {isExpanded && (
        <ol>
          {btcCtx.addresses?.map((addr) => (
            <li key={addr}>{addr}</li>
          ))}
        </ol>
      )}
    </>
  );
}
export default BtcAddressList;
