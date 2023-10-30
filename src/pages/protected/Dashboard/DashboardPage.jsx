import {useContext} from "react";
import AuthContext from "../../../context/AuthContext/AuthContext.js";
function DashboardPage() {
    const {Auth} = useContext(AuthContext);
    console.log('test',Auth);
  return (
      <section>
          <div className="w-full h-1/8 bg-white rounded-md shadow-md p-4 flex justify-center">
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
      </section>
  );
}

export default DashboardPage;
