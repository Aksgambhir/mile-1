// Test ID: IIDSAT
import OrderItem from "./OrderItem";
import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-3 py-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 text-red-50 px-3 py-1 font-semibold uppercase text-xs">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 text-green-50 px-3 py-1 font-semibold uppercase text-xs">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-4 py-2">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-300 border-y border-stone-300">
        {cart.map((item) => (
          <OrderItem item={item} key={item.PizzaId} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-4 py-2">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}

export default Order;
