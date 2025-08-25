import React, { useState } from 'react';
import statusColors from './statusColors';
import { OrderCard } from './OrderCard';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { OrdersAPI } from '../../services/ordersAPI';

type OrderStatus = 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';

interface Order {
  batchId: string;
  orderId: string;
  customerName: string;
  productName: string;
  quantity: number;
  deliverySchedule: string;
  status: OrderStatus;
}

interface MainWelcomeDashboardWithDetailsProps {
  orders: Order[];
  onOrderUpdate?: (orderId: string, newStatus: OrderStatus) => void;
}

export const MainWelcomeDashboardWithDetails: React.FC<MainWelcomeDashboardWithDetailsProps> = ({
  orders,
  onOrderUpdate,
}) => {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  
  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Get the previous status for a given status
  const getPreviousStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const statusOrder: OrderStatus[] = ['In Production', 'In Printing', 'In Binding', 'Packaging', 'Delivery'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    // Return previous status if it exists
    if (currentIndex > 0) {
      return statusOrder[currentIndex - 1];
    }
    
    return null; // No previous status (already at the first status)
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedOrder = orders.find(order => order.batchId === active.id);
    setActiveOrder(draggedOrder || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveOrder(null);

    if (!over) return;

    const draggedOrderId = active.id as string;
    const targetStatus = over.id as OrderStatus;
    
    const draggedOrder = orders.find(order => order.batchId === draggedOrderId);
    if (!draggedOrder) return;

    const currentStatus = draggedOrder.status;
    
    // Only allow moving to previous status (backward movement)
    const previousStatus = getPreviousStatus(currentStatus);
    
    if (targetStatus !== previousStatus) {
      console.log('❌ Can only move orders backward to previous status');
      return;
    }

    if (currentStatus === targetStatus) return;

    // Update local state immediately for instant UI feedback
    if (onOrderUpdate) {
      onOrderUpdate(draggedOrder.orderId, targetStatus);
    }

    console.log(`✅ Order ${draggedOrder.orderId} moved from ${currentStatus} to ${targetStatus}`);

    // Update API in background - don't block the UI
    try {
      await OrdersAPI.updateOrder(draggedOrder.orderId, {
        status: targetStatus
      });
      console.log(`✅ Order ${draggedOrder.orderId} successfully updated in database`);
    } catch (error) {
      console.error('❌ Failed to update order status in database:', error);
      
      // Revert the local change if API call fails
      if (onOrderUpdate) {
        onOrderUpdate(draggedOrder.orderId, currentStatus);
      }
      
      // Show user feedback about the error
      alert('Failed to update order status. Changes have been reverted.');
    }
  };
  // Group orders by status
  const groupedOrders = orders.reduce((acc, order) => {
    const status = order.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(order);
    return acc;
  }, {} as Record<OrderStatus, Order[]>);

  const statusColumns: { status: OrderStatus; label: string; icon: string }[] = [
    { status: 'In Production', label: 'In production', icon: '●' },
    { status: 'In Printing', label: 'Printing', icon: '●' },
    { status: 'In Binding', label: 'Binding', icon: '●' },
    { status: 'Packaging', label: 'Packaging', icon: '●' },
    { status: 'Delivery', label: 'Ready for delivery', icon: '●' },
  ];

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full h-full bg-white shadow-lg rounded-2xl flex flex-col p-6">
        {/* Status Columns */}
        <div className="grid grid-cols-5 gap-4 h-full mt-2">
          {statusColumns.map((column) => {
            const columnOrders = groupedOrders[column.status] || [];
            const statusColor = statusColors[column.status];
            
            return (
              <DroppableColumn
                key={column.status}
                status={column.status}
                label={column.label}
                statusColor={statusColor}
                orders={columnOrders}
              />
            );
          })}
        </div>
        
        {/* Drag Overlay */}
        <DragOverlay>
          {activeOrder ? (
            <div className="transform rotate-3 opacity-80">
              <OrderCard 
                order={activeOrder}
                statusColor={statusColors[activeOrder.status]}
                isDragging={true}
              />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

// Droppable Column Component
interface DroppableColumnProps {
  status: OrderStatus;
  label: string;
  statusColor: string;
  orders: Order[];
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  status,
  label,
  statusColor,
  orders
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div 
        className="rounded-lg p-3 mb-4 font-medium text-sm border-2"
        style={{ borderColor: statusColor }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: statusColor }}
          ></div>
          <span className="text-black">{label}</span>
        </div>
        <div className="text-xs mt-1 text-gray-600">
          {orders.length} products
        </div>
      </div>

      {/* Droppable Area */}
      <DroppableArea status={status} statusColor={statusColor} orders={orders} />
    </div>
  );
};

// Droppable Area Component
interface DroppableAreaProps {
  status: OrderStatus;
  statusColor: string;
  orders: Order[];
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ status, statusColor, orders }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto py-4 px-2 bg-[#FFFDF9] rounded-2xl border transition-all duration-200 ${
        isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''
      }`}
      style={{ borderColor: `${statusColor}50` }}
    >
      {orders.map((order) => (
        <DraggableOrderCard 
          key={order.batchId}
          order={order}
          statusColor={statusColor}
        />
      ))}
    </div>
  );
};

// Draggable Order Card Component
interface DraggableOrderCardProps {
  order: Order;
  statusColor: string;
}

const DraggableOrderCard: React.FC<DraggableOrderCardProps> = ({ order, statusColor }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: order.batchId,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
    >
      <OrderCard 
        order={order}
        statusColor={statusColor}
        isDragging={isDragging}
      />
    </div>
  );
};
