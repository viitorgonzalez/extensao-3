export interface Address {
  street?: string;
  number?: string;
  neighborhood?: string;
}  

export interface Property {
  id?: string
  created_at?: string
  address?: Address
  zone?: string
  category?: number
}
