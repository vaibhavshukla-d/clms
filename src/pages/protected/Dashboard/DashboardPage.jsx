import { useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext.js";
import React, { PureComponent, useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Approve", value: 400 },
  { name: "Reject", value: 300 },
  { name: "Disbursed", value: 300 },
  { name: "Pending", value: 200 },
];
const data1 = [
  {
    name: "Partner A",
    Approved: 4000,
    Rejected: 2400,
    amt: 2400,
  },
  {
    name: "Partner B",
    Approved: 3000,
    Rejected: 1398,
    amt: 2210,
  },
  {
    name: "Partner C",
    Approved: 2000,
    Rejected: 9800,
    amt: 2290,
  },
  {
    name: "Partner D",
    Approved: 2780,
    Rejected: 3908,
    amt: 2000,
  },
];
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

function DashboardPage() {
  const { Auth } = useContext(AuthContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  console.log("test", Auth);
  return (
    <section>
      <div className="w-full h-1/8 bg-white rounded-md p-4 flex justify-center">
        <div className="w-1/4 border-r border-gray-300">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Approved Applications</h3>
            <p>100</p>
          </div>
        </div>
        <div className="w-1/4  border-r border-gray-300 pl-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Sanction Amount</h3>
            <p>₹ 1,000,000</p>
          </div>
        </div>
        <div className="w-1/4 pr-4 border-r border-gray-300 pl-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Total Disbursement</h3>
            <p>₹ 800,000</p>
          </div>
        </div>
        <div className="w-1/4 pr-4 pl-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Today Collection</h3>
            <p>₹ 50,000</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-3/6 mt-2 rounded-lg h-96 mr-2">
          <div className=" bg-white w-full rounded-md">
            <h1 className="p-4 text-muted font-medium">Application Status</h1>
            <div className="pie-chart-container">
              <PieChart
                width={480}
                height={350}
                className="flex"
                style={{ marginTop: "2rem" }}
              >
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx={280}
                  cy={130}
                  innerRadius={80}
                  outerRadius={100}
                  fill="#0095ff"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                />
              </PieChart>
            </div>
          </div>
        </div>
        <div className="flex w-3/6 mt-2 rounded-lg h-96 content-center">
          <div className="flex-col bg-white w-full rounded-md  items-center justify-center text-sm">
            <h1 className="p-4 text-muted font-medium">
              Partner Wise Application Status
            </h1>
            <ResponsiveContainer width="80%" height="70%" className="m-auto">
              <BarChart
                width={500}
                height={250}
                data={data1}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Approved"
                  fill="#0095ff"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="Rejected"
                  fill="#cd212a"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
