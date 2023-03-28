import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  getColors,
  resetState,
  deleteColor,
} from "../features/color/colorSlice";
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

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };
  //console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      title: colorState[i].title,
      action: (
        <>
          <Link
            className="text-danger fs-5"
            to={`/admin/color/${colorState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="text-danger ms-3 fs-5 bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteAColor = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    dispatch(resetState());

    setTimeout(() => {
      dispatch(getColors());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        title="Are you sure you want to delete this color?"
        performAction={() => deleteAColor(colorId)}
      />
    </div>
  );
};

export default ColorList;
