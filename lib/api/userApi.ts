import { apiCall } from "./apiCall";
import { ApiResponse } from "../types/apiCommon";

interface Project {
  id: number;
  name: string;
  address: string;
  details: {
    logoUrl: string;
  };
}

interface ProfileData {
  id: number;
  address: string;
  fid: number;
  name: string;
  instagram: string;
  github: string;
  telegram: string;
  warpcastPicture: string;
}

interface ProfileListMeta {
  page?: string;
  limit?: string;
  total?: number;
}

interface UserProfileResponse {
  id: number;
  address: string;
  fid: number;
  name: string;
  email: string;
  instagram: string;
  github: string;
  telegram: string;
  profilePicture: string;
  warpcastPicture: string;
  createdAt: string;
  updatedAt: string;
  ownedProjects?: Project[];
  managedProjects?: Project[];
}

interface ProfileListResponse {
  data: ProfileData[];
  meta: ProfileListMeta;
}

interface UpdateProfileRequest {
  address: string;
  name?: string;
  instagram?: string;
  github?: string;
  telegram?: string;
}

export const getProfileDetail = async (
  address: string
): Promise<UserProfileResponse> => {
  const response = await apiCall<ApiResponse<UserProfileResponse>>({
    method: "get",
    url: `/user/profile/${address}`,
  });
  return response.data!;
};

export const getProfileList = async (
  page: number = 1,
  limit: number = 10
): Promise<ProfileListResponse> => {
  const response = await apiCall<ApiResponse<ProfileData[]>>({
    method: "get",
    url: "/user/profile/list",
    params: { page, limit },
  });
  if (!response.data || !response.meta) {
    throw new Error("Invalid response from server");
  }
  return {
    data: response.data,
    meta: response.meta,
  };
};

export const updateProfile = async (
  profileData: UpdateProfileRequest
): Promise<UserProfileResponse> => {
  const response = await apiCall<ApiResponse<UserProfileResponse>>({
    method: "post",
    url: "/user/profile/update",
    data: profileData,
    isPrivate: true,
  });
  
  return response.data!;
};