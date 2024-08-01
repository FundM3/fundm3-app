import { formatEther } from 'viem';
import { Optional } from '@/lib/types/common';

export const formatAddress = (
  address: Optional<`0x${string}`>,
  sliceIdx = 6
) => {
  if (!address) {
    return '';
  }

  return address.slice(0, sliceIdx) + '...' + address.slice(-sliceIdx);
};

export const formatBalance = (value: Optional<bigint>, sliceIdx = 8) => {
  if (!value) {
    return 0;
  }

  return formatEther(value).toString().slice(0, sliceIdx);
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
};
