export interface ValidationResponse {
  valid: boolean;
  number: string;
  local_format: string;
  international_format: string;
  country_prefix: string;
  country_code: string;
  country_name: string;
  location: string;
  carrier: string;
  line_type: string;
  success?: boolean;
  error?: Error;
}

export interface ValidationRequest {
  number: string;
  country_code: string;
}

export interface Error {
  code: number;
  type: string;
  info: string;
}
