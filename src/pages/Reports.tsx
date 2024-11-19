import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const Reports: React.FC = () => {
  const [filter, setFilter] = useState<string>("revenue");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [data, setData] = useState([
    { date: "Jan", revenue: 4000, subscribers: 50, cancellations: 5 },
    { date: "Feb", revenue: 3000, subscribers: 40, cancellations: 8 },
    { date: "Mar", revenue: 5000, subscribers: 70, cancellations: 3 },
    { date: "Apr", revenue: 6000, subscribers: 60, cancellations: 4 },
  ]);

  const handleExportCSV = () => {
    const csvContent = [
      ["Date", filter.charAt(0).toUpperCase() + filter.slice(1)],
      ...data.map((row) => [row.date, row[filter as keyof typeof row] ?? ""]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filter}-report.csv`;
    a.click();
  };

  const filteredData = data.filter((row) => {
    if (!startDate || !endDate) return true;
    const rowDate = new Date(row.date);
    return rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      {/* Filtros */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          sx={{ width: 200 }}
        >
          <MenuItem value="revenue">Revenue</MenuItem>
          <MenuItem value="subscribers">New Subscribers</MenuItem>
          <MenuItem value="cancellations">Cancellations</MenuItem>
        </Select>
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button variant="contained" color="primary">
          Apply
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleExportCSV}
          sx={{ ml: "auto" }}
        >
          Export to CSV
        </Button>
      </Box>

      {/* Gráficos */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)} Trend
            </Typography>
            {filter === "revenue" ? (
              <LineChart
                width={800}
                height={400}
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            ) : (
              <BarChart
                width={800}
                height={400}
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <Bar
                  dataKey={filter}
                  fill={filter === "subscribers" ? "#82ca9d" : "#f44336"}
                />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </BarChart>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Tabla de Datos */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        {filter === "revenue"
                          ? `$${row[filter as keyof typeof row]}`
                          : row[filter as keyof typeof row]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;
