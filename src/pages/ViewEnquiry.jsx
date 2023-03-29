import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getEnquiryById,
  resetState,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";

const ViewEnquiry = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  //console.log(location);
  const enquiryId = location.pathname.split("/")[3];
  //console.log(enquiyId);

  const enquiryState = useSelector((state) => state.enquiry);
  const {
    enquiryName,
    enquiryEmail,
    enquiryMobile,
    enquiryComment,
    enquiryStatus,
  } = enquiryState;

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiryById(enquiryId));
  }, [dispatch, enquiryId]);

  const goBack = () => {
    window.history.back();
  };

  const setEnquiryStatus = (e, i) => {
    //console.log(e, i);
    const enquiry = {
      id: i,
      data: e,
    };
    dispatch(updateEnquiry(enquiry));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getEnquiryById(enquiryId));
    }, 300);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button className="btn btn-primary" onClick={goBack}>
          Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 rounded-3 d-flex flex-column gap-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{enquiryName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <a href={`tel:${enquiryMobile}`} className="mb-0">
            {enquiryMobile}
          </a>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <a href={`mailto:${enquiryEmail}`} className="mb-0">
            {enquiryEmail}
          </a>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enquiryComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{enquiryStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              className="form-select"
              defaultValue={enquiryStatus ? enquiryStatus : "Submitted"}
              name=""
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, enquiryId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="In progress">In Progress</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiry;
