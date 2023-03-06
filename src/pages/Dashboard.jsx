import React from "react";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      value: 0.16,
    },
    {
      type: "Feb",
      value: 0.125,
    },
    {
      type: "Mar",
      value: 0.24,
    },
    {
      type: "Apr",
      value: 0.24,
    },
    {
      type: "May",
      value: 0.24,
    },
    {
      type: "June",
      value: 0.19,
    },
    {
      type: "Jul",
      value: 0.22,
    },
    {
      type: "Aug",
      value: 0.05,
    },
    {
      type: "Sep",
      value: 0.01,
    },
    {
      type: "Oct",
      value: 0.015,
    },
    {
      type: "Nov",
      value: 0.015,
    },
    {
      type: "Dec",
      value: 0.015,
    },
  ];
  const paletteSemanticRed = "#F4664A";
  const brandColor = "#ffd333";
  const config = {
    data,
    xField: "type",
    yField: "value",
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
  return (
    <div>
      <h1 className="mb-4 fs-3 title">Dashboard</h1>

      <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="mb-0 light">Total Orders:</p>
            <h4>$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsGraphDownArrow className="me-1" />
              32%
            </h6>
            <p className="mb-0 light">Compared to April, 2022</p>
          </div>
        </div>

        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="mb-0 light">Total:</p>
            <h4>$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsGraphDownArrow className="me-1" />
              32%
            </h6>
            <p className="mb-0 light">Compared to April, 2022</p>
          </div>
        </div>

        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="mb-0 light">Total:</p>
            <h4>$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsGraphDownArrow className="me-1" />
              32%
            </h6>
            <p className="mb-0 light">Compared to April, 2022</p>
          </div>
        </div>
      </div>

      {/* Income stats */}
      <div className="mb-4">
        <h3 className="sub-title mb-4">Income Statistics</h3>
        <div>
          <Column {...config} />
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
