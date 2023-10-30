import { useState, useEffect } from "react";

const Header = () => {
  const [systemCodeDetail, setSystemCodeDetail] = useState([]);

  useEffect(() => {
    // Retrieve the data from local storage
    const storedSystemCodeDetail = localStorage.getItem("SystemCodeDetail");

    if (storedSystemCodeDetail) {
      // Parse the data (if it's a JSON string)
      const parsedData = JSON.parse(storedSystemCodeDetail);
      console.log(parsedData);
      setSystemCodeDetail(parsedData);
    }
  }, []);
  return (
    <div className="header">
      <h1 className="font-medium mr-2" style={{ whiteSpace: "nowrap" }}>
        CO-LENDING MANGEMENT SYSTEM
      </h1>
      <div className="flex w-full justify-end">
        <label className="text-gray-600 ml-2 mr-2">Select System Code:</label>
        <select className="w-1/4">
          {systemCodeDetail.map((item, index) => (
            <option key={index} value={item.Code} className="w-1/4">
              {item.Description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
