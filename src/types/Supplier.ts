export type SupplierType = {
  id: string;
  name: string;
  address: SupplierAddress;
};

export type SupplierAddress = {
  id: string;
  street: string;
  number: number;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};
