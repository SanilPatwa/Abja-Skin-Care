export interface Client {
  id: number;
  name: string;
  type: "Salon" | "Doctor" | "Ayurvedic Store" | "Parlour";
  phone: string;
  city: string;
}

export interface Visit {
  id: number;
  clientName: string;
  salesRep: string;
  date: string;
  notes: string;
  status: "Completed" | "Pending" | "Cancelled";
}
