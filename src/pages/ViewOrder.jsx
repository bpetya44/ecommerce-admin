import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import { getUserOrder } from "../features/auth/authSlice";

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
    title: "Product",
    dataIndex: "title",
    sorter: (a, b) => b.title.localeCompare(a.title),
    sortDirections: ["descend"],
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => b.title.localeCompare(a.title),
    sortDirections: ["descend"],
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => b.title.localeCompare(a.title),
    sortDirections: ["descend"],
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Pcs.",
    dataIndex: "count",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.amount - b.amount,
    sortDirections: ["descend"],
  },
  {
    title: "Shipping",
    dataIndex: "shipping",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderId = location.pathname.split("/")[3];
  console.log(orderId);

  useEffect(() => {
    dispatch(getUserOrder(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state?.auth?.singleOrder);
  console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,

      createdAt: new Date(orderState?.createdAt).toLocaleString(),
      // `${orderState[i].createdAt.toString().split("T")[0]} ${
      //   orderState[i].createdAt.toString().split("T")[1].split(".")[0]}`,
      //   name: (
      //     <>
      //       <p>{`${orderState[i].orderedBy.firstName} ${orderState[i].orderedBy.lastName}`}</p>
      //       <p>{orderState[i].orderedBy.email}</p>
      //       <p>{orderState[i].orderedBy.mobile}</p>
      //     </>
      //   ),
      title: orderState?.orderItems[i]?.product.title,
      category: orderState?.orderItems[i]?.product.category,
      brand: orderState?.orderItems[i]?.product.brand,
      color: orderState?.orderItems[i]?.color?.title || "N/A",
      count: orderState?.orderItems[i]?.quantity,

      price: `$ ${orderState?.orderItems[i]?.price}`,
      shipping: (
        <>
          <p>Address: {orderState?.shippingInfo?.address},</p>
          <p>{orderState?.shippingInfo?.other},</p>
          <p>City: {orderState?.shippingInfo?.city}</p>
          <p>Zip: {orderState?.shippingInfo?.pincode}</p>
          <p>State: {orderState?.shippingInfo?.state}</p>
          <p>
            Names: {orderState?.shippingInfo?.firstName}{" "}
            {orderState?.shippingInfo?.lastName}
          </p>
          {/* <p>{orderState?.shippingInfo?.mobile}</p> */}
          <p>Country: {orderState?.shippingInfo?.country}</p>
        </>
      ),

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
      <h3 className="mb-4 title">User Order</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />{" "}
      </div>
    </div>
  );
};

export default ViewOrder;
