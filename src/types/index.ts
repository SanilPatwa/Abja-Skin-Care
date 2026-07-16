export interface Client {
  id: number;
  name: string;
  type: "Salon" | "Doctor" | "Ayurvedic Store" | "Parlour";
  phone: string;
  city: string;
}
