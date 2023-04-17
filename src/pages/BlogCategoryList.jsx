import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  getBlogCategories,
  resetState,
  deleteBlogCategory,
} from "../features/blogCategory/blogCategorySlice";
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

const BlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setBlogCatId(e);
  };
  //console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [dispatch]);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.categories
  );
  const data1 = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogCategoryState[i].title,

      action: (
        <>
          <Link
            className="text-danger fs-5"
            to={`/admin/blog-category/${blogCategoryState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            type="submit"
            className="text-danger ms-3 fs-5 bg-transparent border-0"
            onClick={() => showModal(blogCategoryState[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteBlogCategoryHandler = (e) => {
    dispatch(deleteBlogCategory(e));
    setOpen(false);
    dispatch(resetState());

    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        title="Are you sure you want to delete this Blog Category?"
        performAction={() => {
          deleteBlogCategoryHandler(blogCatId);
        }}
      />
    </div>
  );
};

export default BlogCategoryList;
