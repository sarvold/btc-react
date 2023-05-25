import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  BtcAddressListContext,
  BtcAddressListContextType
} from '../../context/btc-context';
import { isMappedErrorStatus, MAPPED_ERROR_MESSAGES } from '../../shared/components/Errors';
import UiButton from '../../ui-components/UiButton';
import UiErrorModal, { ErrorModalProps } from '../../ui-components/UiErrorModal';
import { UiSectionHeader } from '../../ui-components/UiSectionHeader';

function BtcAddressList() {
  const btcCtx = useContext<BtcAddressListContextType>(BtcAddressListContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [error, setError] = useState<Omit<
  ErrorModalProps,
  'onConfirm'
> | null>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<string[]>(
          'http://localhost:3000/blockchain/addresses'
        );
        const uniqueAddresses: string[] = Array.from(new Set(response.data));
        btcCtx.populateAddresses(uniqueAddresses);
      } catch (err) {
        console.error(err);
        setError({
          title: (axios.isAxiosError(err) && err.response?.statusText) || 'Error',
          message:
            axios.isAxiosError(err) && isMappedErrorStatus(err?.response?.status)
              ? MAPPED_ERROR_MESSAGES[err!.response!.status].message({isListOfAddresses: true})
              : 'Something went wrong, try again.',
        });
      }
    }
    fetchData();
  }, []);

  const toggleListHandler = () => {
    setIsExpanded((prevState: boolean) => !prevState);
  };


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
      <UiSectionHeader text="BTC addresses involved in recent transactions" />
      <UiButton onClick={toggleListHandler}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </UiButton>
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
