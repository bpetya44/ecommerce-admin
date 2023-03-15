import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import { getEnquiries } from "../features/enquiry/enquirySlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
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
          <select className="form-control form-select" name="" id="">
            <option value="">Set Status</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link className="text-danger ms-3 fs-5" to="/">
            <BiTrash />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
