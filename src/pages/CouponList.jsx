import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  getCoupons,
  resetState,
  deleteCoupon,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";

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
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };
  //console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
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
          <Link
            className="text-danger fs-5"
            to={`/admin/coupon/${couponState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="text-danger ms-3 fs-5 bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteACoupon = (e) => {
    dispatch(deleteCoupon(e));
    setOpen(false);
    dispatch(resetState());

    setTimeout(() => {
      dispatch(getCoupons());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        title="Are you sure you want to delete this coupon?"
        performAction={() => {
          deleteACoupon(couponId);
        }}
      />
    </div>
  );
};

export default CouponList;
