export interface Flags {
  svg: string;
  png: string;
}

export interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
  nativeName: string;
  numericCode: string;
  flags: Flags;
  flag: string;
}
