import { apiCall } from "./apiCall";
import { ApiResponse } from "../types/apiCommon";

export interface Donation {
  id: number;
  transactionHash: string;
  donor: string;
  recipient: string;
  totalAmount: number;
  recipientAmount: number;
  fee: number;
  blockNumber: number;
  timestamp: Date;
}

export interface DonationResponse {
  donations: Donation[];
  total: number;
}

export const getDonationsByProjectId = async (
  projectId: number
): Promise<DonationResponse> => {
  const response = await apiCall<ApiResponse<DonationResponse>>({
    method: "get",
    url: `/donation/project/${projectId}`,
  });
  return response.data!;
};

export const getDonationsByDonor = async (
  donorAddress: string
): Promise<DonationResponse> => {
  const response = await apiCall<ApiResponse<DonationResponse>>({
    method: "get",
    url: `/donation/donor/${donorAddress}`,
  });
  return response.data!;
};

export const getDonationsByRecipient = async (
  recipientAddress: string
): Promise<DonationResponse> => {
  const response = await apiCall<ApiResponse<DonationResponse>>({
    method: "get",
    url: `/donation/recipient/${recipientAddress}`,
  });
  return response.data!;
};

export const getTotalDonationAmountForProject = async (
  projectId: number
): Promise<number> => {
  const response = await apiCall<ApiResponse<number>>({
    method: "get",
    url: `/donation/total/project/${projectId}`,
  });
  return response.data!;
};

export const getTotalDonationAmountForUser = async (
  donorAddress: string
): Promise<number> => {
  const response = await apiCall<ApiResponse<number>>({
    method: "get",
    url: `/donation/total/user/${donorAddress}`,
  });
  return response.data!;
};

export const getDonationByTxHash = async (
  transactionHash: string
): Promise<Donation> => {
  const response = await apiCall<ApiResponse<Donation>>({
    method: "get",
    url: `/donation/${transactionHash}`,
  });
  return response.data!;
};
