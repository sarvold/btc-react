import React, { useState } from 'react';
import UiButton from '../../ui-components/UiButton';
import { UiDescriptionList } from '../../ui-components/UiDescriptionList';
import { UiInputField } from '../../ui-components/UiInputField';

export interface BlockcypherTransaction {
  block_hash: string;
  block_height: number;
  block_index: number;
  hash: string;
  addresses: string[];
  total: number;
  fees: number;
  size: number;
  vsize: number;
  preference: string;
  confirmed: string;
  received: string;
  ver: number;
  double_spend: boolean;
  vin_sz: number;
  vout_sz: number;
  confirmations: number;
  confidence: number;
  inputs: {
    prev_hash: string;
    output_index: number;
    output_value: number;
    sequence: number;
    addresses: string[];
    script_type: string;
    age: number;
    witness?: string[];
  }[];
  outputs: {
    value: number;
    script: string;
    spent_by?: string;
    addresses?: string[];
    script_type?: string;
  }[];
}

function BtcTransaction() {
  const [searchTransaction, setSearchTransaction] = useState('');
  const [txData, setTxData] = useState<BlockcypherTransaction | null>(null);

  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:3000/blockchain/transactions/${searchTransaction}`
    );
    const data = await response.json();

    setTxData(data);
  };

  const addressInputLabel = 'Search Address:';

  const txAmount = txData?.outputs.reduce(
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
