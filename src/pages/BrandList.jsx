import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  getBrands,
  resetState,
  deleteBrand,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => b.title.localeCompare(a.title),
    sortDirections: ["descend"],
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };
  //console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      title: brandState[i].title,
      action: (
        <>
          <Link
            className="text-danger fs-5"
            to={`/admin/brand/${brandState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            type="submit"
            className="text-danger ms-3 fs-5 bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteABrand = (e) => {
    dispatch(deleteBrand(e));
    setOpen(false);
    dispatch(resetState());

    setTimeout(() => {
      dispatch(getBrands());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        title="Are you sure you want to delete this brand?"
        performAction={() => {
          deleteABrand(brandId);
        }}
      />
    </div>
  );
};

export default BrandList;
