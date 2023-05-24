import axios from 'axios';
import React, { useRef, useState } from 'react';
import { BlockcypherAddress } from '../../models/blockchain';
import UiButton from '../../ui-components/UiButton';
import { UiDescriptionList } from '../../ui-components/UiDescriptionList';
import { UiInputField } from '../../ui-components/UiInputField';
import { UiSectionHeader } from '../../ui-components/UiSectionHeader';

function BtcAddress() {
  const [searchAddress, setSearchAddress] = useState('');
  const [addressData, setAddressData] = useState<BlockcypherAddress | null>(
    null
  );

  // Here useRef comes handy for keeping any mutable value around
  const lastSearchedAddressRef = useRef<string>('');

  const handleSearch = async () => {
    if (searchAddress === lastSearchedAddressRef?.current) {
      return;
    }
    try {
      const response = await axios.get<BlockcypherAddress>(
        `http://localhost:3000/blockchain/addresses/${searchAddress}`
      );
      if (response.status === 400) {
        throw new Error('Bad request.');
      }
      if (response.status === 500) {
        throw new Error('Internal server error');
      }
      const data: BlockcypherAddress = await response.data;

      setAddressData(data);
      lastSearchedAddressRef.current = searchAddress;
    } catch (error) {
      console.error(error);
      alert('Address search failed: ' + (error as Error).message);
    }
  };

  const addressItems = [
    { term: 'Total Received', description: `${addressData?.total_received}` },
    { term: 'Total Sent', description: `${addressData?.total_sent}` },
    { term: 'Final Balance', description: `${addressData?.final_balance}` },
  ];
  const txItems = addressData?.txrefs?.map((tx) => {
    return {
      term: `Hash "${tx.tx_hash}"`,
      description: `${tx.value} Satoshi. Balance: ${tx.ref_balance}`,
    };
  });

  return (
    <>
      <UiSectionHeader text="Address Information" />
      <UiInputField
        label="Search Address:"
        type="text"
        value={searchAddress}
        onChange={(e) => setSearchAddress(e.target.value)}
      />
      <UiButton text="Search" onClick={handleSearch} />
      {addressData && (
        <>
          <UiDescriptionList items={addressItems} />
          <h3>Transactions</h3>
          {txItems && <UiDescriptionList items={txItems} />}
        </>
      )}
    </>
  );
}
export default BtcAddress;
