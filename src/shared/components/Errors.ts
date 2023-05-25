type MappedErrorStatus = 400 | 404 | 500;

export const isMappedErrorStatus = (
  status: unknown
): status is MappedErrorStatus =>
  status === 400 || status === 404 || status === 500;

const isListOfAddressesParams = (
  params: unknown
): params is { isListOfAddresses: boolean } => {
  return (
    typeof params === 'object' &&
    params !== null &&
    'isListOfAddresses' in params
  );
};
type ErrorMessageParams =
  | {
      hashFrom: 'transaction' | 'address';
      hash: string;
    }
  | {
      isListOfAddresses: boolean;
    };

export const MAPPED_ERROR_MESSAGES: {
  [key in MappedErrorStatus]: {
    message: (params: ErrorMessageParams) => string;
  };
} = {
  400: {
    message: (params: ErrorMessageParams) =>
      isListOfAddressesParams(params)
        ? 'Failed to fetch list of addresses. Bad request'
        : `Could not fetch ${params.hashFrom} ${params.hash}. \n Maybe it is the wrong hash?`,
  },
  404: {
    message: (params: ErrorMessageParams) =>
      isListOfAddressesParams(params)
        ? 'Failed to fetch list of addresses. Not found'
        : `${
            params.hashFrom.charAt(0).toUpperCase() + params.hashFrom.slice(1)
          } ${params.hash} not found. \n Maybe it is the wrong hash?`,
  },
  500: {
    message: (params: ErrorMessageParams) =>
      isListOfAddressesParams(params)
        ? 'Failed to fetch list of addresses. Internal server error'
        : `Something went wrong while searching for ${params.hashFrom} ${params.hash}. Please try again`,
  },
};
