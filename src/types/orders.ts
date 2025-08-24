type OrderStatus =
  | "In Production"
  | "In Printing"
  | "In Binding"
  | "Packaging"
  | "Delivery";

// The simplified sheet types you requested
export type SheetType = "Fliers" | "OMR Sheets" | "Jotters";

// Updated the Order interface to use the new simple SheetType
export interface Order {
  batchId: string;
  orderId: string;
  customerName: string;
  productName: string;
  sheetType: SheetType; // Simplified this field
  quantity: number;
  deliverySchedule: string;
  status: OrderStatus;
}
