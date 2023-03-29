import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import {
  getEnquiries,
  resetState,
  deleteEnquiry,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
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
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => b.email.localeCompare(a.email),
    sortDirections: ["descend"],
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => b.email.localeCompare(a.email),
    sortDirections: ["descend"],
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };
  //console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: (
        <>
          <select
            className="form-select"
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "Submitted"
            }
            name=""
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiryState[i]._id)
            }
          >
            <option value="Submitted">Submitted</option>
            <option value="In progress">In Progress</option>
            <option value="Contacted">Contacted</option>
            <option value="Closed">Closed</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="text-primary ms-3 fs-5"
            to={`/admin/enquiries/${enquiryState[i]._id}`}
          >
            <BsEye />
          </Link>
          <button
            type="submit"
            className="text-danger ms-3 fs-5 bg-transparent border-0"
            onClick={() => showModal(enquiryState[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    //console.log(e, i);
    const enquiry = {
      id: i,
      data: e,
    };
    dispatch(updateEnquiry(enquiry));
  };

  const deleteEnquiryHandler = (e) => {
    dispatch(deleteEnquiry(e));
    setOpen(false);
    dispatch(resetState());

    setTimeout(() => {
      dispatch(getEnquiries());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        title="Are you sure you want to delete this enquiry?"
        performAction={() => {
          deleteEnquiryHandler(enquiryId);
        }}
      />
    </div>
  );
};

export default Enquiries;
