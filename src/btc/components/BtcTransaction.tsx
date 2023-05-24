import axios from 'axios';
import React, { useRef, useState } from 'react';
import { BlockcypherTransaction } from '../../models/blockchain';
import UiButton from '../../ui-components/UiButton';
import { UiDescriptionList } from '../../ui-components/UiDescriptionList';
import { UiInputField } from '../../ui-components/UiInputField';

function BtcTransaction() {
  const [searchTransaction, setSearchTransaction] = useState<string>('');
  const [txData, setTxData] = useState<BlockcypherTransaction | null>(null);

  // Here useRef comes handy for keeping any mutable value around
  const lastSearchedTxRef = useRef<string>('');

  const handleSearch = async () => {
    if (searchTransaction === lastSearchedTxRef?.current) {
      return;
    }
    try {
      const response = await axios.get<BlockcypherTransaction>(
        `http://localhost:3000/blockchain/transactions/${searchTransaction}`
      );
      if (response.status === 400) {
        throw new Error('Bad request.');
      }
      if (response.status === 500) {
        throw new Error('Internal server error');
      }
      const data: BlockcypherTransaction = await response.data;

      setTxData(data);
      lastSearchedTxRef.current = searchTransaction;
    } catch (error) {
      console.error(error);
      alert('Address search failed: ' + (error as Error).message);
    }
  };

  const addressInputLabel = 'Search Address:';

  const txAmount = txData?.outputs?.reduce(
    (total, output) => total + output.value,
    0
  );

  const items = [
    { term: 'Transaction Hash:', description: `${txData?.hash}` },
    {
      term: 'Transaction Value:',
      description: `${txAmount} Satoshis`,
    },
  ];

  return (
    <>
      <h2>Transaction Information</h2>
      <UiInputField
        label={addressInputLabel}
        type="text"
        value={searchTransaction}
        onChange={(e) => setSearchTransaction(e.target.value)}
      />
      <UiButton text="Search" onClick={handleSearch} />
      {txData && <UiDescriptionList items={items} />}
    </>
  );
}
export default BtcTransaction;
