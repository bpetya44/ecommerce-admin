import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import { getBlogs, resetState, deleteBlog } from "../features/blog/blogSlice";
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
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => b.category.localeCompare(a.category),
    sortDirections: ["descend"],
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  //console.log(blogId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
      action: (
        <>
          <Link
            className="text-danger fs-5"
            to={`/admin/blog/${blogState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            type="submit"
            className="text-danger ms-3 fs-5  bg-transparent border-0"
            onClick={() => showModal(blogState[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteBlogHandler = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);
    dispatch(resetState());

    setTimeout(() => {
      dispatch(getBlogs());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        title="Are you sure you want to delete this Blog Category?"
        performAction={() => {
          deleteBlogHandler(blogId);
        }}
      />
    </div>
  );
};

export default BlogList;
