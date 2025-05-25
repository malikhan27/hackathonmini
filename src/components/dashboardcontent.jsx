import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { supabase } from "../utils/config";
import React, { use } from "react";
import Loader from "./loader";
import SimpleCharts from "./bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useContext } from "react";
import { CompleteDataContext } from "../context/completeData";
import CopilotData from "../utils/copilotreadable";
import { CopilotPopup } from "@copilotkit/react-ui";


export default function Dashboarddata() {


const { completeData , sessiondata} = useContext(CompleteDataContext);
const [filteredData, setFilteredData] = React.useState([]);
const [approvedData, setApprovedData] = React.useState([]);

  // async function fetchSessionData() { 
  //   try {
  //       const { data: { session }, error } = await supabase.auth.getSession();
  //       if (error) throw error;
  //       if (session) {
  //         setSessionData(session);
  //         console.log(session);
  //       }
  //      } catch (error) {
  //       error.message;
  //       console.error("Session check failed", error);
  //      }
  //  }
 
const currentUser = completeData.filter((item) => item?.USERID == sessiondata?.user?.id)

  React.useEffect(() => {
    const pending = currentUser.filter((item) => item.STATUS === "pending");
    const approved = currentUser.filter((item) => item.STATUS === "approved");
  
    setFilteredData(pending);
    setApprovedData(approved);
  }, [completeData]);
  
  

const isLoading = !completeData?.length || !sessiondata?.user?.id;
 

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
              <TrendingUpIcon sx={{ fontSize: 50, color: "lightblue" }} />
              <Box sx={{ whiteSpace: "wrap" }}>
                <h4 className="fw-bolder">TOTAL REQUEST</h4>
                <h2 className="mt-3 fw-bolder">
                  {isLoading? <Loader size = {15}/> :currentUser.length}
                </h2>
              </Box>
            </Box>
          </CardContent>
        </Card>

        
      </Box>

      <Box sx={{ width: "100%", paddingX: { xs: 2 }, marginY: 3 }}>
        <SimpleCharts pendingData={filteredData.length} totalData={currentUser.length} approvedData={approvedData.length} />
      </Box>
    </Box>
    <CopilotData loanData={currentUser} />
      <CopilotPopup
        key={sessiondata?.user?.id}
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Popup Assistant",
          initial: "Hi! 👋 How can I assist you today?",
        }}
    />
    
  </>
  );
}
