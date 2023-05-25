import axios from 'axios';
import React, { useRef, useState } from 'react';
import { BlockcypherTransaction } from '../../models/blockchain';
import {
  isMappedErrorStatus,
  MAPPED_ERROR_MESSAGES,
} from '../../shared/components/Errors';
import UiButton from '../../ui-components/UiButton';
import { UiDescriptionList } from '../../ui-components/UiDescriptionList';
import UiErrorModal, {
  ErrorModalProps,
} from '../../ui-components/UiErrorModal';
import { UiInputField } from '../../ui-components/UiInputField';

function BtcTransaction() {
  const [searchTransaction, setSearchTransaction] = useState<string>('');
  const [txData, setTxData] = useState<BlockcypherTransaction | null>(null);
  const [error, setError] = useState<Omit<
    ErrorModalProps,
    'onConfirm'
  > | null>();

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
      const data: BlockcypherTransaction = await response.data;

      setTxData(data);
      lastSearchedTxRef.current = searchTransaction;
    } catch (err) {
      console.error(err);
      setError({
        title: (axios.isAxiosError(err) && err.response?.statusText) || 'Error',
        message:
          axios.isAxiosError(err) && isMappedErrorStatus(err?.response?.status)
            ? MAPPED_ERROR_MESSAGES[err!.response!.status].message({
                hashFrom: 'transaction',
                hash: searchTransaction,
              })
            : 'Something went wrong, try again.',
      });
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

  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      {error && (
        <UiErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <h2>Transaction Information</h2>
      <UiInputField
        label={addressInputLabel}
        type="text"
        value={searchTransaction}
        onChange={(e) => setSearchTransaction(e.target.value)}
      />
      <UiButton onClick={handleSearch}>Search</UiButton>
      {txData && <UiDescriptionList items={items} />}
    </>
  );
}
export default BtcTransaction;
