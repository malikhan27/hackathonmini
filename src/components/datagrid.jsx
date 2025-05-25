import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { supabase } from "../utils/config";
import { CompleteDataContext } from "../context/completeData";
import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import { useContext } from "react";
import Loader from "./loader";
import { useLocation } from "react-router";
import {Button} from "@mui/material";
import {Typography} from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router";

export default function DataTable() {
  const location = useLocation();
const [openModal, setOpenModal] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);

const handleOpenModal = (row) => {
  setSelectedRow(row);
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedRow(null);
};

const { completeData, sessiondata ,fetchCompleteData,  fetchSessionData} = useContext(CompleteDataContext);
fetchSessionData()
console.log(completeData);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "NAME",
      headerName: "NAME",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "STATUS",
      headerName: "STATUS",
      minWidth: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const value = params.value;
        let color = "default";
        if (value === "approved") color = "success";
        if (value === "rejected") color = "error";
        if (value === "pending") color = "warning";
        return <Chip label={value} color={color} />;
      },
    },
    {
      field: "CATEGORY",
      headerName: "CARTEGORY",
      type: "number",
      minWidth: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "LOCATION",
      headerName: "LOCATION",
      type: "number",
      minWidth: 140,
      align: "center",
      headerAlign: "center",
    },
    {
             field: "View",
  headerName: "View",
  type: "text",
  minWidth: 180,
  align: "center",
  headerAlign: "center",
  renderCell: (params) => {
    return (
      
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleOpenModal(params.row)}
      >
        <RemoveRedEyeIcon/>
      </Button>
     
    );

  },
          },
    ...(location.pathname=="/admindashboard" ? 
       [
          {
            field: "action",
            headerName: "Action",
            type: "text",
            minWidth: 180,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
              if(params.row.STATUS !== "pending") return <p  className="text-danger">No Action Required</p>
              const value = params.id;
              async function handleApprove() {
                try {
                  const { error } = await supabase
                    .from("EVENTS")
                    .update({ STATUS: "approved" })
                    .eq("id", value);
                  if (error) throw error;
                  fetchCompleteData();
                } catch (error) {}
              }
              async function handleReject() {
                try {
                  const { error } = await supabase
                    .from("EVENTS")
                    .update({ STATUS: "rejected" })
                    .eq("id", value);

                    fetchCompleteData();
                } catch (error) {}
              }


            
              return  <Box sx={{display:"flex",gap:2,marginY:1}}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleApprove}
                  sx={{ width: "100px" }}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleReject}
                  sx={{ width: "100px" }}
                >
                  Reject
                </Button>
              </Box>;
            },
          },
          
        ]
      : []),
  ];

 

 

 
  
 const filteredData = sessiondata?.user 
  ? completeData?.filter((item) => item?.USERID === sessiondata.user.id) 
  : [];


  return (
    <>
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      {!completeData ? (
        <Loader />
      ) : (
        <Box sx={{ minWidth: 800 }}>
          {" "}
          {/* Ensures DataGrid gets enough width */}
          <DataGrid
            rows={location.pathname=="/admindashboard"?completeData:filteredData}
            columns={columns}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                },
              },
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            showToolbar
            sx={{
              border: 1,
              borderColor: "#38bdf8",
              color: "#0a192f",
              "& .MuiDataGrid-cell": {
                color: "#0a192f",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#e3f2fd",
                color: "#0a192f",
                fontWeight: "bold",
              },
              "& .MuiCheckbox-root svg": {
                fill: "#38bdf8",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#e3f2fd",
                color: "#0a192f",
              },
            }}
          />
        </Box>
      )}
    </Box>
  <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
  <DialogTitle>Event Details</DialogTitle>
  <DialogContent dividers>
    {selectedRow ? (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, color: "text.primary" }}>
        <Typography><strong>ID:</strong> {selectedRow.id}</Typography>
        <Typography><strong>Name:</strong> {selectedRow.NAME}</Typography>
        <Typography><strong>Status:</strong> {selectedRow.STATUS}</Typography>
        <Typography><strong>Category:</strong> {selectedRow.CATEGORY}</Typography>
        <Typography><strong>Location:</strong> {selectedRow.LOCATION}</Typography>
        <Typography><strong>Email:</strong> {selectedRow.EMAIL}</Typography>
          <Box
            component="img"
            src={selectedRow.IMAGE}
            alt="Event"
            sx={{ maxWidth: "100%", maxHeight: 300, borderRadius: 2, mt: 2 }}
          />
       
      </Box>
    ) : (
      <Typography>Loading...</Typography>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>




</>
  );
}
