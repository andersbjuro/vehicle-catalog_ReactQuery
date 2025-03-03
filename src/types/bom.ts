export interface BomFormData {
  name: string,
  brandId: number,
  productGroupId: number,
  countryCode: number
}

export interface BomActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof BomFormData]?: string[];
  };
}

