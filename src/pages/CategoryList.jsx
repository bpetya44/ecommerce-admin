import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  getCategories,
  resetState,
  deleteCategory,
} from "../features/category/categorySlice";
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

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };
  //console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const categoryState = useSelector((state) => state.category.categories);
  const data1 = [];
  for (let i = 0; i < categoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: categoryState[i].title,
      action: (
        <>
          <Link
            className="text-danger fs-5"
            to={`/admin/category/${categoryState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="text-danger ms-3 fs-5 bg-transparent border-0"
            onClick={() => showModal(categoryState[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteACategory = (e) => {
    dispatch(deleteCategory(e));
    setOpen(false);

    setTimeout(() => {
      dispatch(resetState());
      dispatch(getCategories());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        title="Are you sure you want to delete this Product Category?"
        performAction={() => {
          deleteACategory(categoryId);
        }}
      />
    </div>
  );
};

export default CategoryList;
