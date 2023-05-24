import React, { useRef, useState } from 'react';
import UiButton from '../../ui-components/UiButton';
import { UiDescriptionList } from '../../ui-components/UiDescriptionList';
import { UiInputField } from '../../ui-components/UiInputField';
import { UiSectionHeader } from '../../ui-components/UiSectionHeader';
import { BlockcypherTransaction } from './BtcTransaction';

export interface BlockcypherAddress {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
  txrefs: TxRef[];
  tx_url: string;
}
interface TxRef {
  block_height: number;
  confirmations: number;
  confirmed: string;
  double_spend: boolean;
  ref_balance: number;
  spent: boolean;
  tx_hash: string;
  tx_input_n: number;
  tx_output_n: number;
  value: number;
}

function BtcAddress() {
  const [searchAddress, setSearchAddress] = useState('');
  const [addressData, setAddressData] = useState<BlockcypherAddress | null>(
    null
  );
  const lastSearchedAddressRef = useRef<string>('');

  const handleSearch = async () => {
    if (searchAddress === lastSearchedAddressRef?.current) {
      console.log('Address already searched. Skipping API call.');
      return;
    }
    console.log('Searching for address ', searchAddress);
    const response = await fetch(
      `http://localhost:3000/blockchain/addresses/${searchAddress}`
    );
    const data = await response.json();

    setAddressData(data);
    lastSearchedAddressRef.current = searchAddress;
  };

  const addressItems = [
    { term: 'Total Received', description: `${addressData?.total_received}` },
    { term: 'Total Sent', description: `${addressData?.total_sent}` },
    { term: 'Final Balance', description: `${addressData?.final_balance}` },
  ];
  const txItems = addressData?.txrefs?.map((tx) => {
    return { term: `Hash "${tx.tx_hash}"`, description: `${tx.value} Satoshi. Balance: ${tx.ref_balance}` };
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
