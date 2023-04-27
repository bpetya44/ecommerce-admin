import { useState } from "react";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllOrders,
  getMonthlyData,
  getYearlyData,
  getUserOrder,
} from "../features/auth/authSlice";

const columns = [
  {
    title: "Order #",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Products #",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "After Discount",
    dataIndex: "disprice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const ordersState = useSelector((state) => state?.auth?.orders);

  const data1 = [];
  for (let i = 0; i < ordersState?.length; i++) {
    data1.push({
      key: i + 1,
      name:
        ordersState[i]?.user?.firstName + " " + ordersState[i]?.user?.lastName,
      product: ordersState[i]?.orderItems?.length,
      price: ordersState[i]?.totalPrice,
      disprice: ordersState[i]?.totalPriceAfterDiscount,
      status: ordersState[i]?.orderStatus,
    });
  }

  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);

  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getAllOrders());
    dispatch(getUserOrder());
  }, [dispatch]);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let i = 0; i < monthlyDataState?.length; i++) {
      //console.log(monthlyDataState[i].month);
      data.push({
        type: monthNames[monthlyDataState[i]?._id?.month],
        income: monthlyDataState[i]?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[monthlyDataState[i]?._id?.month],
        sales: monthlyDataState[i]?.count,
      });
    }
    // console.log(data);
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);
  }, [monthlyDataState]);

  const brandColor = "#FDCA40";
  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    seriesField: "",
    color: ({ type }) => {
      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    seriesField: "",
    color: ({ type }) => {
      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  return (
    <div>
      <h1 className="mb-4 fs-3 title">Dashboard</h1>
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="mb-0 light">Total Orders Amount:</p>
            <h4>${yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsGraphDownArrow className="me-1" />
              32%
            </h6>
            <p className="mb-0 light">Yearly Total Amount</p>
          </div>
        </div>

        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="mb-0 light">Total Number Sales:</p>
            <h4>{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsGraphDownArrow className="me-1" />
              32%
            </h6>
            <p className="mb-0 light">Sales for 1 year from today</p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between gap-3">
        {/* Income stats */}
        <div className="mb-4 flex-grow-1 w-50">
          <h3 className="sub-title mb-4">Income Statistics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        {/* Sales stats */}
        <div className="mb-4 flex-grow-1 w-50">
          <h3 className="sub-title mb-4">Sales Statistics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="mb-4 ">
        <h3 className="mb-3 sub-title">Recent Orders</h3>
        <div>
          {" "}
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      {/* Recent Reviews */}
      <div className="mb-4 ">
        <h3 className="mb-3 sub-title">Recent Reviews</h3>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
