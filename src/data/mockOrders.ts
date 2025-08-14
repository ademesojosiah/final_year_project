type OrderStatus =
  | "In Production"
  | "In Printing"
  | "In Binding"
  | "Packaging"
  | "Delivery"


export const mockOrders = [
  {
    batchId: "123457",
    orderId: "ORD-25456",
    quantity: 500,
    deliverySchedule: "01/09/2025",
    status: "In Production" as OrderStatus,
  },
  {
    batchId: "123458",
    orderId: "ORD-25498",
    quantity: 750,
    deliverySchedule: "02/09/2025",
    status: "In Printing" as OrderStatus,
  },
  {
    batchId: "245678",
    orderId: "ORD-245678",
    quantity: 1200,
    deliverySchedule: "July 08, 2025",
    status: "In Binding" as OrderStatus,
  },
  {
    batchId: "123459",
    orderId: "ORD-25458",
    quantity: 300,
    deliverySchedule: "03/09/2025",
    status: "In Binding" as OrderStatus,
  },
  {
    batchId: "123460",
    orderId: "ORD-25455",
    quantity: 1000,
    deliverySchedule: "04/09/2025",
    status: "In Production" as OrderStatus,
  },
  {
    batchId: "123461",
    orderId: "ORD-25495",
    quantity: 250,
    deliverySchedule: "05/09/2025",
    status: "Delivery" as OrderStatus,
  },
  {
    batchId: "123462",
    orderId: "ORD-25459",
    quantity: 800,
    deliverySchedule: "06/09/2025",
    status: "Packaging" as OrderStatus,
  },
  {
    batchId: "123463",
    orderId: "ORD-25460",
    quantity: 600,
    deliverySchedule: "07/09/2025",
    status: "In Production" as OrderStatus,
  },
  {
    batchId: "123464",
    orderId: "ORD-25461",
    quantity: 450,
    deliverySchedule: "08/09/2025",
    status: "In Printing" as OrderStatus,
  },
  {
    batchId: "123465",
    orderId: "ORD-25462",
    quantity: 900,
    deliverySchedule: "09/09/2025",
    status: "In Binding" as OrderStatus,
  },
  {
    batchId: "123466",
    orderId: "ORD-25463",
    quantity: 350,
    deliverySchedule: "10/09/2025",
    status: "Delivery" as OrderStatus,
  },
  {
    batchId: "123467",
    orderId: "ORD-25464",
    quantity: 700,
    deliverySchedule: "11/09/2025",
    status: "Packaging" as OrderStatus,
  },
  {
    batchId: "123468",
    orderId: "ORD-25465",
    quantity: 550,
    deliverySchedule: "12/09/2025",
    status: "In Production" as OrderStatus,
  },
  {
    batchId: "123469",
    orderId: "ORD-25466",
    quantity: 850,
    deliverySchedule: "13/09/2025",
    status: "In Printing" as OrderStatus,
  },
  {
    batchId: "123470",
    orderId: "ORD-25467",
    quantity: 400,
    deliverySchedule: "14/09/2025",
    status: "In Binding" as OrderStatus,
  },
  {
    batchId: "123471",
    orderId: "ORD-25468",
    quantity: 950,
    deliverySchedule: "15/09/2025",
    status: "Delivery" as OrderStatus,
  },
  {
    batchId: "123472",
    orderId: "ORD-25469",
    quantity: 650,
    deliverySchedule: "16/09/2025",
    status: "Completed" as OrderStatus,
  },
  {
    batchId: "123473",
    orderId: "ORD-25470",
    quantity: 800,
    deliverySchedule: "17/09/2025",
    status: "In Production" as OrderStatus,
  },
  {
    batchId: "123474",
    orderId: "ORD-25471",
    quantity: 550,
    deliverySchedule: "18/09/2025",
    status: "In Printing" as OrderStatus,
  },
  {
    batchId: "123475",
    orderId: "ORD-25472",
    quantity: 750,
    deliverySchedule: "19/09/2025",
    status: "In Binding" as OrderStatus,
  },
  {
    batchId: "123476",
    orderId: "ORD-25473",
    quantity: 600,
    deliverySchedule: "20/09/2025",
    status: "Delivery" as OrderStatus,
  },
];
