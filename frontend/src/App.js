import "./App.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios, * as others from "axios";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BarChart } from "@mui/x-charts/BarChart";
import DynamicTable from "./Table";

function App() {
  const [selectedVendor, setSelectedVendor] = React.useState("");
  const [optionsVendor, setOptionsVendor] = React.useState([]);
  const [sales, setSales] = React.useState([{ _id: 1, numOfSales: 0 }]);

  React.useEffect(() => {
    const fetchVendors = async () => {
      axios.get("/api/vendors").then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            setOptionsVendor(response.data);
            console.log(response.data);
          } else {
            console.log(`Status code ${response.status}`);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    };
    fetchVendors();
  }, []);
  const fetchMonthlySales = async (data) => {
    axios.get(`/api/monthlysales/${data}`).then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          response.data.sort((a, b) => {
            return a._id - b._id;
          });
          setSales(response.data);
        } else {
          console.log(`Status code ${response.status}`);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: Object.values(months),
              scaleType: "band",
              label: "Number of monthly sales made by the vendor",
            },
          ]}
          series={[
            {
              data: sales.map((item) => item.numberOfSales),
            },
          ]}
          width={850}
          height={300}
        />

        <DynamicTable vendor={selectedVendor} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Box component="form" sx={{ mt: 20 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={optionsVendor.map((item) => item.name)}
              sx={{ width: 300, padding: 3 }}
              renderInput={(params) => (
                <TextField {...params} label="Vendor name" />
              )}
              onChange={(event, value) => {
                console.log(value);
                setSelectedVendor(value);
                fetchMonthlySales(value);
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export default App;
