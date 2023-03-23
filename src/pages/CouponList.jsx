import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import { getCoupons } from "../features/coupon/couponSlice";

const columns = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => b.name.localeCompare(a.name),
    sortDirections: ["descend"],
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => b.discount - a.discount,
    sortDirections: ["descend"],
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => b.expiry.localeCompare(a.expiry),
    sortDirections: ["descend"],
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
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
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default CouponList;
