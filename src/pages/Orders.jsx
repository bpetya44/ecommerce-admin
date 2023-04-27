import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
//import { getUserOrders } from "../features/auth/authSlice";
import { getAllOrders, updateOrderStatus } from "../features/auth/authSlice";

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

  const orderState = useSelector((state) => state?.auth?.orders);
  console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,

      createdAt: new Date(orderState[i]?.createdAt).toLocaleString(),
      // `${orderState[i].createdAt.toString().split("T")[0]} ${
      //   orderState[i].createdAt.toString().split("T")[1].split(".")[0]}`,
      name: (
        <>
          <p>{`${orderState[i]?.user?.firstName} ${orderState[i]?.user?.lastName}`}</p>
          <p>{orderState[i]?.user?.email}</p>
          <p>{orderState[i]?.user?.mobile}</p>
        </>
      ),

      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>View Order</Link>
      ),

      amount: `$ ${orderState[i]?.totalPriceAfterDiscount}`,

      action: (
        <>
          <select
            name=""
            id=""
            className="form-select"
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) => updateAOrder(orderState[i]?._id, e.target.value)}
          >
            <option value="Ordered">Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }

  const updateAOrder = (a, b) => {
    console.log(a, b);
    dispatch(updateOrderStatus({ id: a, status: b }));
  };

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
