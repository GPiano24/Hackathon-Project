import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const AdminBookingPage = () => {
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "#EFEFEF",
        height: "100vh",
        width: "100vw",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h2"
        component="div"
        sx={{ marginBottom: 3, fontWeight: "bold", color: "#2C2C2C" }}
      >
        Room Approval
      </Typography>

      <Card
        variant="outlined"
        sx={{
          backgroundColor: "white",
          maxWidth: "420px",
          minHeight: "560px",
          padding: 2,
          borderRadius: 5,
          marginRight: 2,
          marginBottom: "20px",
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "left" }}
          >
            Name:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            John Doe
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "left" }}
          >
            ID:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            202103452
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "left" }}
          >
            Date:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            26-09-2024
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "left" }}
          >
            Time:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            11:18 am - 12:00 pm
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "left" }}
          >
            I'm a:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            Student
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "left" }}
          >
            Room:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            Cagayan De Oro
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "left" }}
          >
            Description:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "left" }}
          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc a iaculis
            vivamus elit curae maecenas mauris maximus dictumst. Tempor
            convallis nisl auctor diam fermentum pharetra per ad lacus.
          </Typography>
        </CardContent>
      </Card>

      <FormControl sx={{ marginRight: 2, width: "420px" }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={"Approved"}>Approved</MenuItem>
          <MenuItem value={"Denied"}>Denied</MenuItem>
          <MenuItem value={"Pending"}>Pending</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#2C2C2C",
          marginTop: 3,
          marginRight: 2,
          width: "420px",
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default AdminBookingPage;
