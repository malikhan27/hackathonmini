import { useState, useEffect, useContext } from "react";
import { CompleteDataContext } from "../context/completeData";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import Loader from "./loader";
import PieActiveArc from "./piechart";
import CopilotData from "../utils/copilotreadable";
import { CopilotPopup } from "@copilotkit/react-ui";
import Dashboarddata from "./dashboardcontent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";


export default function AdminDashContent() {
const [filteredData, setFilteredData] = React.useState([]);
const [approvedData, setApprovedData] = React.useState([]);
const { completeData, sessiondata } = useContext(CompleteDataContext);
const [chartData, setChartData] = useState({ dates: [], counts: [] });

 React.useEffect(() => {
    const pending = completeData.filter((item) => item.STATUS === "pending");
    const approved = completeData.filter((item) => item.STATUS === "approved");
  
    setFilteredData(pending);
    setApprovedData(approved);
  }, [completeData]);
  

  useEffect(() => {
    if (!completeData) return;

    // Count approved events by date
    const approvedData = completeData
      .filter((item) => item.STATUS === "approved")
      .map((item) => new Date(item.created_at).toISOString().split("T")[0]);

    const dateMap = {};

    approvedData.forEach((dateStr) => {
      dateMap[dateStr] = (dateMap[dateStr] || 0) + 1; // count approved events per date
    });

    const sortedDates = Object.keys(dateMap).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const formattedDates = sortedDates.map((dateStr) =>
      new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    );

    const counts = sortedDates.map((date) => dateMap[date]);

    setChartData({ dates: formattedDates, counts });
  }, [completeData]);

  const isLoading = chartData.dates.length === 0 || chartData.counts.length === 0;

  return (
    <>
    <Box
      sx={{
        marginTop: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingX: { xs: 2 },
        paddingBottom: 3,
        color: "#ffffff", // white text
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Card
          sx={{
            backgroundColor: "#112240", // slightly lighter dark blue
            marginTop: 3,
            paddingX: { xs: 4, md: 4, lg: 4 },
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgba(56, 189, 248, 0.4)", // sky blue
            width: { xs: "75%", lg: "20%", xl: "20%" },
            color: "#ffffff",
          }}
        >
          <CardContent>
            <Box className="flex flex-col items-center gap-4 flex-wrap">
              <AccessTimeIcon sx={{ fontSize: 50, color: "yellow" }} />
              <Box sx={{ whiteSpace: "wrap" }}>
                <h4 className="fw-bolder">PENDING EVENTS</h4>
                <h2 className="fw-bold mt-3">
                  {isLoading ? <Loader size = {15}/>:filteredData.length}
                </h2>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: "#112240",
            marginTop: 3,
            paddingX: { xs: 4, md: 4 },
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgba(56, 189, 248, 0.4)",
            width: { xs: "75%", lg: "20%", xl: "20%" },
            color: "#ffffff",
          }}
        >
          <CardContent>
            <Box className="flex flex-col items-center gap-4 flex-wrap">
              <CheckBoxIcon sx={{ fontSize: 52, color: "lightgreen" }} />
              <Box sx={{ whiteSpace: "wrap" }}>
                <h4 className="fw-bolder">APPROVED EVENTS</h4>
                <h2 className="mt-3 fw-bolder">
                {isLoading ? <Loader size = {15}/> :approvedData.length}
                </h2>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: "#112240",
            marginTop: 3,
            paddingX: { xs: 4, md: 4 },
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgba(56, 189, 248, 0.4)",
            width: { xs: "75%", lg: "20%", xl: "20%" },
            color: "#ffffff",
          }}
        >
          <CardContent>
            <Box className="flex flex-col items-center gap-4 flex-wrap">
              <TrendingUpIcon sx={{ fontSize: 50, color: "#38bdf8" }} />
              <Box sx={{ whiteSpace: "wrap" }}>
                <h4 className="fw-bolder">TOTAL REQUEST</h4>
                <h2 className="mt-3 fw-bolder">
                  {isLoading? <Loader size = {15}/> :completeData.length}
                </h2>
              </Box>
            </Box>
          </CardContent>
        </Card>

    
      </Box>

      
    </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
          margin: 1,
          paddingX: 3,
          gap: 1,
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              paddingX: { xs: 2 },
              height: "100%",
              marginY: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader size={50} />
          </Box>
        ) : (
          <>
            <Box sx={{ width: { xs: "90%", lg: "50%" }, paddingX: { xs: 2 } }}>
              <BarChart
                xAxis={[{ data: chartData.dates }]}
                series={[
                  {
                    data: chartData.counts,
                    label: "Approved Events by Dates",
                    itemStyle: (_, index) => ({
                      fill: index % 2 === 0 ? "#1976d2" : "#f44336",
                    }),
                  },
                ]}
                height={290}
              />
            </Box>
            <Box sx={{ width: { xs: "90%", lg: "50%" }, marginY: "5%" }}>
              <PieActiveArc />
            </Box>
          </>
        )}
      </Box>
      <Box sx={{ margin: 1 }}>
        <CopilotData loanData={completeData} />
        <CopilotPopup
          key={sessiondata?.user?.id}
          instructions={
            "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
          }
          labels={{
            title: "Popup Assistant",
            initial: "Hi! 👋 How can I assist you today?",
          }}
        />
      </Box>
    </>
  );
}
