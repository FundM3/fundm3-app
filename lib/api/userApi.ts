import { apiCall } from "./apiCall";
import { ApiResponse } from "../types/apiCommon";

export interface Project {
  id: number;
  name: string;
  address: string;
  details: {
    logoUrl: string;
  };
}

export interface ProfileData {
  id: number;
  address: string;
  fid: number;
  name: string;
  instagram: string;
  github: string;
  telegram: string;
  twitter: string;
  warpcastPicture: string;
  headshot: File;
  hashtag: string;
}

interface ProfileListMeta {
  page?: string;
  limit?: string;
  total?: number;
}

export interface UserProfileResponse {
  id: number | null;
  fid: number | null;
  name: string | null;
  email: string | null;
  instagram: string | null;
  github: string | null;
  telegram: string | null;
  twitter: string | null;
  headshot: File | null;
  hashtag: string | null;
  profilePicture: string | null;
  warpcastPicture: string | null;
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
  fid?: number | null;
  name?: string | null;
  email?: string | null;
  instagram?: string | null;
  github?: string | null;
  telegram?: string | null;
  twitter?: string | null;
  headshot?: File | null;
  hashtag?: string | null;
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

// export const updateProfile = async (
//   profileData: UpdateProfileRequest
// ): Promise<UserProfileResponse> => {
//   const response = await apiCall<ApiResponse<UserProfileResponse>>({
//     method: "post",
//     url: "/user/profile/update",
//     data: profileData,
//     isPrivate: true,
//   });

//   return response.data!;
// };

export const updateProfile = async (
  formData: FormData
): Promise<UserProfileResponse> => {
  const response = await apiCall<ApiResponse<UserProfileResponse>>({
    method: "post",
    url: "/user/profile/update",
    data: formData,
    isPrivate: true,
    isFormData: true,
  });
  //   if (!response.data || !response.success) {
  //     throw new Error("Invalid response from server");
  //   }
  return response.data!;
};
