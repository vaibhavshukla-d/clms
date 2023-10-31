import axios from "axios";

export async function fetchAndSetSystemCodeData() {
  const apiUrl = "http://192.168.1.33:4000/api";
  const requestHeaders = {
    "Content-Type": "application/json",
  };
  const requestBody = {
    Method: "GetSystemCodeDetails",
  };

  const systemCodeData = localStorage.getItem("systemCodeData");

  // localStorage.setItem("isAuthenticated", "true");
  // console.log(localStorage.getItem("systemCodeData"));

  if (!systemCodeData) {
    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: requestHeaders,
      });
      if (response.status === 200) {
        const data = response.data;
        // console.log("data:", JSON.stringify(data[0].SystemCodeList));
        localStorage.setItem(
          "SystemCodeDetail",
          JSON.stringify(data[0].SystemCodeList)
        );
      } else {
        console.error("Failed to fetch system code data from the API");
      }
    } catch (error) {
      console.error("Error while fetching or setting systemCodeData:", error);
    }
  }
}
