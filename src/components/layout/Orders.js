import { useEffect, useState } from "react";
import classes from "./Header.module.css";
import { useCallback } from "react";

function Orders(props) {
  const [orders, setOrders] = useState([]);

  const deleteOrder = useCallback(async (orderId) => {
    let url = `https://my-app-d8e22-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${orderId}.json`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete order.");
      }

      console.log("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let response = await fetch(
          "https://my-app-d8e22-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json"
        );
        let data = await response.json();

        if (data) {
          // Convert the object of orders to an array of orders
          let myorders = [];
          for (let key in data) {
            myorders.push({
              id: key,
              item: data[key].orderedItems,
              user: data[key].user,
            });
          }

          setOrders(myorders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [deleteOrder]);
  console.log(orders)
  if (orders.length === 0) {
    return (
      <>
        <div className={classes.order}>
          <button
            className={classes.closeOrderpanel}
            onClick={props.OrderHandler}
          >
            Close
          </button>
          <div>No orders found.</div>
        </div>
      </>
    );
  }

  function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price * item.amount, 0);
  }
  return (
    <div className={classes.order}>
      <button className={classes.closeOrderpanel} onClick={props.OrderHandler}>
        Close
      </button>
      {orders.map((order) => (
        <div key={order.id} className={classes.orderItem}>
          <h3>Order Details</h3>
          <p>Name: {order.user.name}</p>
          <p>City: {order.user.city}</p>
          <p>Postal Code: {order.user.postalCode}</p>
          <p>Street: {order.user.street}</p>

          <h4 className={classes.items}>Ordered Items</h4>
          <ul>
            {order.item.map((item) => (
              <li key={item.id}>
                {item.amount} x {item.name} - $
                {item.price.toFixed(2) * item.amount}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div className={classes.total}>
              <p>Total: ${calculateTotal(order.item).toFixed(2)}</p>
            </div>
            <div
              className={classes.cancel}
              onClick={() => {
                deleteOrder(order.id);
              }}
            >
              <p> Cancel Order</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
