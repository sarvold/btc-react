import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import { BtcAddressListContext } from '../../context/btc-context';
import BtcAddressList from './BtcAddressList';

jest.mock('axios');

describe('BtcAddressList', () => {
  const mockContext = {
    addresses: ['address1', 'address2'],
    populateAddresses: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the component with the section header and button', () => {
    render(
      <BtcAddressListContext.Provider value={mockContext}>
        <BtcAddressList />
      </BtcAddressListContext.Provider>
    );

    expect(
      screen.getByText('BTC addresses involved in recent transactions')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Expand' })).toBeInTheDocument();
  });

  it('renders the list of addresses when the button is clicked', () => {
    render(
      <BtcAddressListContext.Provider value={mockContext}>
        <BtcAddressList />
      </BtcAddressListContext.Provider>
    );

    userEvent.click(screen.getByRole('button', { name: 'Expand' }));

    expect(screen.getByText('address1')).toBeInTheDocument();
    expect(screen.getByText('address2')).toBeInTheDocument();
  });

  it('fetches the addresses from the API and populates the context', async () => {
    const mockResponse = {
      status: 200,
      data: ['address1', 'address2'],
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      mockResponse
    );

    render(
      <BtcAddressListContext.Provider value={mockContext}>
        <BtcAddressList />
      </BtcAddressListContext.Provider>
    );

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3000/blockchain/addresses'
    );

    await screen.findByText('address1');

    expect(mockContext.populateAddresses).toHaveBeenCalledWith([
      'address1',
      'address2',
    ]);
  });

  it('displays an error message when the API call fails', async () => {
    const mockError = new Error('Internal server error');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(
      mockError
    );

    render(
      <BtcAddressListContext.Provider value={mockContext}>
        <BtcAddressList />
      </BtcAddressListContext.Provider>
    );

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3000/blockchain/addresses'
    );

    await screen.findByText('Address search failed: Internal server error');
  });
});
