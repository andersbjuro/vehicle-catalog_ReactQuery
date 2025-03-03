export interface SearchValueFormData {
  searchValue: string,
  valueType: number,
  countryCode: number
}

export interface SearchValueActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof SearchValueFormData]?: string[];
  };
}

