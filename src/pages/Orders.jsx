import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
//import { getUserOrders } from "../features/auth/authSlice";
import { getAllOrders } from "../features/auth/authSlice";

const columns = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Cteated At",
    dataIndex: "createdAt",
    sorter: (a, b) => b.createdAt.localeCompare(a.createdAt),
    sortDirections: ["descend"],
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => b.name.localeCompare(a.name),
    sortDirections: ["descend"],
  },
  {
    title: "Products",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
    sortDirections: ["descend"],
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders);
  console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,

      createdAt: new Date(orderState[i].createdAt).toLocaleString(),
      // `${orderState[i].createdAt.toString().split("T")[0]} ${
      //   orderState[i].createdAt.toString().split("T")[1].split(".")[0]}`,
      name: (
        <>
          <p>{`${orderState[i].orderedBy.firstName} ${orderState[i].orderedBy.lastName}`}</p>
          <p>{orderState[i].orderedBy.email}</p>
          <p>{orderState[i].orderedBy.mobile}</p>
        </>
      ),

      product: (
        <Link to={`/admin/order/${orderState[i].orderedBy._id}`}>
          View Order
        </Link>
      ),

      amount: `$ ${orderState[i].paymentIntent.amount.toFixed(2)}`,

      action: (
        <>
          <Link className="text-danger fs-5" to="/">
            <BiEdit />
          </Link>
          <Link className="text-danger ms-3 fs-5" to="/">
            <BiTrash />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
