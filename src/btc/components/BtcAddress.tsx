import axios from 'axios';
import React, { useRef, useState } from 'react';
import { BlockcypherAddress } from '../../models/blockchain';
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
import { UiSectionHeader } from '../../ui-components/UiSectionHeader';

function BtcAddress() {
  const [searchAddress, setSearchAddress] = useState('');
  const [addressData, setAddressData] = useState<BlockcypherAddress | null>(
    null
  );
  const [error, setError] = useState<Omit<
    ErrorModalProps,
    'onConfirm'
  > | null>();

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
      const data: BlockcypherAddress = await response.data;

      setAddressData(data);
      lastSearchedAddressRef.current = searchAddress;
    } catch (err) {
      console.error(err);
      setError({
        title: (axios.isAxiosError(err) && err.response?.statusText) || 'Error',
        message:
          axios.isAxiosError(err) && isMappedErrorStatus(err?.response?.status)
            ? MAPPED_ERROR_MESSAGES[err!.response!.status].message({
                hashFrom: 'address',
                hash: searchAddress,
              })
            : 'Something went wrong, try again.',
      });
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
      <UiSectionHeader text="Address Information" />
      <UiInputField
        label="Search Address:"
        type="text"
        value={searchAddress}
        onChange={(e) => setSearchAddress(e.target.value)}
      />
      <UiButton onClick={handleSearch}>Search</UiButton>
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
