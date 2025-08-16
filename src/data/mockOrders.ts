type OrderStatus =
  | "In Production"
  | "In Printing"
  | "In Binding"
  | "Packaging"
  | "Delivery";

// It's good practice to define the shape of your order object
interface Order {
  batchId: string;
  orderId: string;
  customerName: string;
  productName: string;
  quantity: number;
  deliverySchedule: string;
  status: OrderStatus;
}

export const mockOrders: Order[] = [
  {
    batchId: "123457",
    orderId: "ORD-25456",
    customerName: "Adebayo Johnson",
    productName: "A5 Business Fliers (Glossy)",
    quantity: 500,
    deliverySchedule: "01/09/2025",
    status: "In Production",
  },
  {
    batchId: "123458",
    orderId: "ORD-25498",
    customerName: "Chiamaka Okoro",
    productName: "OMR Answer Sheets (100q)",
    quantity: 750,
    deliverySchedule: "02/09/2025",
    status: "In Printing",
  },
  {
    batchId: "245678",
    orderId: "ORD-245678",
    customerName: "Femi Adekunle",
    productName: "A4 Burial Program Flier",
    quantity: 1200,
    deliverySchedule: "July 08, 2025",
    status: "In Binding",
  },
  {
    batchId: "123459",
    orderId: "ORD-25458",
    customerName: "Zainab Aliyu",
    productName: "Custom Birthday Jotter (50 pages)",
    quantity: 300,
    deliverySchedule: "03/09/2025",
    status: "In Binding",
  },
  {
    batchId: "123460",
    orderId: "ORD-25455",
    customerName: "Emeka Nwosu",
    productName: "Wedding Invitation Cards",
    quantity: 1000,
    deliverySchedule: "04/09/2025",
    status: "In Production",
  },
  {
    batchId: "123461",
    orderId: "ORD-25495",
    customerName: "Aisha Ibrahim",
    productName: "Product Stickers (Vinyl)",
    quantity: 250,
    deliverySchedule: "05/09/2025",
    status: "Delivery",
  },
  {
    batchId: "123462",
    orderId: "ORD-25459",
    customerName: "Tunde Ojo",
    productName: "A2 Roll-up Banner",
    quantity: 800,
    deliverySchedule: "06/09/2025",
    status: "Packaging",
  },
  {
    batchId: "123463",
    orderId: "ORD-25460",
    customerName: "Ngozi Eze",
    productName: "Letterhead Paper (100gsm)",
    quantity: 600,
    deliverySchedule: "07/09/2025",
    status: "In Production",
  },
  {
    batchId: "123464",
    orderId: "ORD-25461",
    customerName: "Adebayo Johnson", // Re-used customer for realism
    productName: "OMR Answer Sheets (200q)",
    quantity: 450,
    deliverySchedule: "08/09/2025",
    status: "In Printing",
  },
  {
    batchId: "123465",
    orderId: "ORD-25462",
    customerName: "Chiamaka Okoro", // Re-used customer
    productName: "Company Brochures (Tri-fold)",
    quantity: 900,
    deliverySchedule: "09/09/2025",
    status: "In Binding",
  },
  {
    batchId: "123466",
    orderId: "ORD-25463",
    customerName: "Femi Adekunle", // Re-used customer
    productName: "Custom Birthday Jotter (100 pages)",
    quantity: 350,
    deliverySchedule: "10/09/2025",
    status: "Delivery",
  },
  {
    batchId: "123467",
    orderId: "ORD-25464",
    customerName: "Zainab Aliyu", // Re-used customer
    productName: "A5 Event Flier Sheet",
    quantity: 700,
    deliverySchedule: "11/09/2025",
    status: "Packaging",
  },
  {
    batchId: "123468",
    orderId: "ORD-25465",
    customerName: "Emeka Nwosu", // Re-used customer
    productName: "A4 Burial Program Flier",
    quantity: 550,
    deliverySchedule: "12/09/2025",
    status: "In Production",
  },
  {
    batchId: "123469",
    orderId: "ORD-25466",
    customerName: "Aisha Ibrahim", // Re-used customer
    productName: "Business Cards (Matte Finish)",
    quantity: 850,
    deliverySchedule: "13/09/2025",
    status: "In Printing",
  },
  {
    batchId: "123470",
    orderId: "ORD-25467",
    customerName: "Tunde Ojo", // Re-used customer
    productName: "OMR Answer Sheets (100q)",
    quantity: 400,
    deliverySchedule: "14/09/2025",
    status: "In Binding",
  },
  {
    batchId: "123471",
    orderId: "ORD-25468",
    customerName: "Ngozi Eze", // Re-used customer
    productName: "Wedding Invitation Cards",
    quantity: 950,
    deliverySchedule: "15/09/2025",
    status: "Delivery",
  },
  {
    batchId: "123472",
    orderId: "ORD-25469",
    customerName: "Adebayo Johnson",
    productName: "A5 Business Fliers (Glossy)",
    quantity: 650,
    deliverySchedule: "16/09/2025",
    status: "Delivery", // CORRECTED: Changed from "Completed"
  },
  {
    batchId: "123473",
    orderId: "ORD-25470",
    customerName: "Chiamaka Okoro",
    productName: "Custom Birthday Jotter (50 pages)",
    quantity: 800,
    deliverySchedule: "17/09/2025",
    status: "In Production",
  },
  {
    batchId: "123474",
    orderId: "ORD-25471",
    customerName: "Femi Adekunle",
    productName: "A4 Burial Program Flier",
    quantity: 550,
    deliverySchedule: "18/09/2025",
    status: "In Printing",
  },
  {
    batchId: "123475",
    orderId: "ORD-25472",
    customerName: "Zainab Aliyu",
    productName: "OMR Answer Sheets (150q)",
    quantity: 750,
    deliverySchedule: "19/09/2025",
    status: "In Binding",
  },
  {
    batchId: "123476",
    orderId: "ORD-25473",
    customerName: "Emeka Nwosu",
    productName: "A6 Marketing Flier Sheet",
    quantity: 600,
    deliverySchedule: "20/09/2025",
    status: "Delivery",
  },
];