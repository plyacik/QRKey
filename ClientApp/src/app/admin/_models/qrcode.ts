export interface QrCodeResponce {
    list: QrCode[];
  }
  
  export interface QrCode {
    code: string;
    validity: number;
    created: number;
    client_Name?: string;
    client_Phone?: string;
  }