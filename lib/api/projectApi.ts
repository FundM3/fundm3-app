import { apiCall } from "./apiCall";
import { ApiResponse } from "../types/apiCommon";

interface User {
  id?: number;
  name: string;
  address: string;
  warpcastPicture: string;
}

export interface ProjectData {
  id: number;
  name: string;
  address: string;
  createdAt: string;
  logoUrl: string;
  ownerName: string;
}

interface ProjectListMeta {
  page?: string;
  limit?: string;
  total?: number;
}

export interface ProjectResponse {
  id: number;
  fid: number;
  name: string;
  description: string;
  address: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  owner: User;
  details: {
    id: number;
    logoUrl: string;
    projectImageUrls: string[];
    instagram: string;
    github: string;
    telegram: string;
  };
  managers?: User[];
}

interface ProfileListResponse {
  data: ProjectData[];
  meta: ProjectListMeta;
}

interface ProjectFidResponse {
  id: number;
  fid: number | null;
}

interface CreateProjectResponse {
  data: ProjectResponse;
  success: boolean;
}

interface UpdateProjectRequest {
  projectId: number;
  address: string;
  name?: string;
  description?: string;
  email?: string;
  instagram?: string;
  github?: string;
  telegram?: string;
}

interface CreateProjectRequest {
  ownerAddress: string;
  name: string;
  description: string;
  projectAddress: string;
  email: string;
  logo: File;
  projectImage: File[];
  instagram?: string;
  github?: string;
  telegram?: string;
}

export const getProjectDetail = async (
  projectId: number
): Promise<ProjectResponse> => {
  const response = await apiCall<ApiResponse<ProjectResponse>>({
    method: "get",
    url: `/project/${projectId}`,
  });
  return response.data!;
};

export const getProjectList = async (
  page: number = 1,
  limit: number = 10
): Promise<ProfileListResponse> => {
  const response = await apiCall<ApiResponse<ProjectData[]>>({
    method: "get",
    url: "/project/list",
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

export const getProjectFid = async (
  projectId: number
): Promise<ProjectFidResponse> => {
  const response = await apiCall<ApiResponse<ProjectFidResponse>>({
    method: "get",
    url: `/project/${projectId}/fid`,
    isPrivate: true,
  });
  return response.data!;
};

export const updateProjectInfo = async (
  projectData: UpdateProjectRequest
): Promise<ProjectResponse> => {
  const response = await apiCall<ApiResponse<ProjectResponse>>({
    method: "post",
    url: `/project/update/info`,
    data: projectData,
    isPrivate: true,
  });
  return response.data!;
};

export const createProject = async (
  formData: FormData
): Promise<CreateProjectResponse> => {
  const response = await apiCall<ApiResponse<ProjectResponse>>({
    method: "post",
    url: "/project/create",
    data: formData,
    isPrivate: true,
    isFormData: true,
  });
  if (!response.data || !response.success) {
    throw new Error("Invalid response from server");
  }
  return {
    data: response.data,
    success: response.success,
  };
};