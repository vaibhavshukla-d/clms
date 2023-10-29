import React, {useState} from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialBullionData = [];

export default function BullionRate() {
    const newURl = "http://localhost:4000/api";

    const [user, setUser] = useState({
        effectiveDate: "",
        operatorId: "",
    });

    const [form, setForm] = useState('');
    const [bullionData, setBullionData] = useState(initialBullionData);
    const [isTableModified, setIsTableModified] = useState(false);

    const handleBullionDataChange = (index, field, value) => {
        const newData = bullionData.map((data) => ({...data}));
        newData[index][field] = parseFloat(value);
        setBullionData(newData);
        setIsTableModified(true);
    };

    const clearForm = (e) => {
        e.preventDefault();
        setUser('');
        setBullionData([]);
    };

    const handleSaveClick = async () => {
        if (isTableModified) {
            const data = {
                bankId: "61",
                effectiveDate: user.effectiveDate,
                Method: "AddEditBullionRate",
                BullionRateDet: JSON.stringify(
                    bullionData.map((data) => ({
                        BullionID: data.BullionID,
                        BullionRate: data.BullionRate,
                        MinRate: data.MinRate,
                        MaxRate: data.MaxRate,
                    }))
                ),
                operatorId: user.operatorId,
                createdBy: "user123",
                createdOn: "2023-08-15T10:00:00",
                modifiedBy: "user456",
                modifiedOn: "2023-08-15T11:30:00",
                supervisedBy: "supervisor789",
                supervisedOn: "2023-08-15T12:15:00",
                updateCount: 1,
            };


            if (newURl) {
                axios.post(newURl, data).then((response) => {
                    if (response.data.length > 0) {
                        const validResponse = response.data[0];
                        const Status = validResponse.Status;
                        if (Status == 1) {
                            setIsTableModified(false);
                            toast.success("Saved Successfully", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: false,
                            });
                        } else {
                            console.error("Failed to save data.");
                        }
                    }
                });
            } else {
                console.error("baseURL is undefined");
            }
        }
    };

    const handlePrintValues = async (e) => {
        e.preventDefault();
        let user1 = null;
        user1 = {
            effectiveDate: user.effectiveDate,
            operatorId: user.operatorId,
        };

        console.log(JSON.stringify(user1));
        if (
            (user.effectiveDate == "" || user.effectiveDate == null) &&
            (user.operatorId == "" || user.operatorId == null)
        ) {
            toast.error("Please Enter Effective Date", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            toast.error("Please Enter Operator ID", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        } else if (user.effectiveDate == "" || user.effectiveDate == null) {
            toast.error("Please Enter Effective Date", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        } else if (user.operatorId == "" || user.operatorId == null) {
            toast.error("Please Enter Operator ID", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }


        const data = {
            Method: "GetBullionRate",
            bankId: "61",
            effectiveDate: user.effectiveDate,
            OperatorID: user.operatorId,
        };

        console.log(JSON.stringify(data));

        setBullionData([]);

        const response = await axios.post(newURl,data,
            {
                headers: {'Content-Type': 'application/json'}
            }
        );
        if (response.data.length > 0) {
            const validResponse = response.data[0];
            const status = validResponse.Status;
            const BullionResultset = validResponse.BullionResultset;
            if (status != 0) {
                setBullionData(
                    BullionResultset.map((item) => ({
                        BullionID: item.BullionID,
                        Name: item.Name,
                        Purity: item.Purity,
                        MaxRate: item.MaxRate,
                        BullionRate: item.BullionRate,
                        MinRate: item.MinRate,
                    }))
                );
            } else {
                setBullionData([]);
                toast.success("No Details Found", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                });
            }
        }

        if (newURl) {
            axios
                .post(newURl, data)
                .then((response) => {
                    if (response.data.length > 0) {
                        const validResponse = response.data[0];
                        const status = validResponse.Status;
                        const BullionResultset = validResponse.BullionResultset;
                        if (status != 0) {
                            setBullionData(
                                BullionResultset.map((item) => ({
                                    BullionID: item.BullionID,
                                    Name: item.Name,
                                    Purity: item.Purity,
                                    MaxRate: item.MaxRate,
                                    BullionRate: item.BullionRate,
                                    MinRate: item.MinRate,
                                }))
                            );
                        } else {
                            setBullionData([]);
                            toast.success("No Details Found", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: false,
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            console.error("baseURL is undefined");
        }
    };

    return (
        <section>
            <div>
                <div
                    className="flex"
                >
                    <div className="w-1/4 m-10 round-2xl">
                        <form className="bg-white shadow-md rounded-2xl px-10 pt-6 pb-8 mb-4">
                            <h1 className="text-2xl font-bold text-center">BullionRate</h1>
                            <div className="mb-4">
                                <label
                                    className="text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="EffectiveDate"
                                >
                                    Effective Date
                                </label>
                                <div
                                    className="shadow border rounded-md focus-outline-none focus-shadow-outline rounded-lg"
                                    id="EffectivceDate"
                                >
                                    <input
                                        type="date"
                                        name="effectiveDate"
                                        className="w-full py-2 pl-2 pr-2 rounded-lg"
                                        value={user.effectiveDate}
                                        onChange={(e) =>
                                            setUser({...user, effectiveDate: e.target.value})
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="OperatorId"
                                >
                                    Operator Id
                                </label>
                                <div
                                    className="shadow border rounded-md focus-outline-none focus-shadow-outline rounded-lg"
                                    id="OperatorId"
                                >
                                    <input
                                        type="text"
                                        name="operatorId"
                                        className="w-full py-2 pl-2 pe-2 rounded-lg"
                                        value={user.operatorId}
                                        onChange={(e) =>
                                            setUser({...user, operatorId: e.target.value})
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex space-4 justify-center">
                                <div className="m-1">
                                    <button onClick={(e) => handlePrintValues(e)}>Submit</button>
                                </div>
                                <div className="m-1">
                                    <button onClick={clearForm}>Clear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-auto m-10 justify-center">
                        <div className="table-container">
                            {bullionData.length > 0 && (
                                <table
                                    className="table-auto w-full border-collapse border border-gray-200 bg-white rounded-xl shadow-md">
                                    <thead>
                                    <tr>
                                        <th className="border border-gray-200 px-4 py-2">BullionID</th>
                                        <th className="border border-gray-200 px-4 py-2">Name</th>
                                        <th className="border border-gray-200 px-4 py-2">Purity</th>
                                        <th className="border border-gray-200 px-4 py-2">MaxRate</th>
                                        <th className="border border-gray-200 px-4 py-2">BullionRate</th>
                                        <th className="border border-gray-200 px-4 py-2">MinRate</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {bullionData.map((data, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-200 px-4 py-2">
                                                {data.BullionID}
                                            </td>
                                            <td className="border border-gray-200 px-4 py-2">
                                                {data.Name}
                                            </td>
                                            <td className="border border-gray-200 px-4 py-2">
                                                {data.Purity}
                                            </td>
                                            <td className="border border-gray-200 px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={data.MaxRate}
                                                    onChange={(e) =>
                                                        handleBullionDataChange(
                                                            index,
                                                            "MaxRate",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full py-1"
                                                />
                                            </td>
                                            <td className="border border-gray-200 px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={data.BullionRate}
                                                    onChange={(e) =>
                                                        handleBullionDataChange(
                                                            index,
                                                            "BullionRate",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full py-1"
                                                />
                                            </td>
                                            <td className="border border-gray-200 px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={data.MinRate}
                                                    onChange={(e) =>
                                                        handleBullionDataChange(
                                                            index,
                                                            "MinRate",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full py-1"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className="flex justify-center m-4">
                            {isTableModified && (
                                <button
                                    className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleSaveClick}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        </section>

    );
}
