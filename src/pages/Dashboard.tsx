import React, { useState } from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Dashboard: React.FC = () => {
  const [data, setData] = useState([
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 4500 },
    { month: "Mar", revenue: 4700 },
    { month: "Apr", revenue: 5000 },
  ]);

  const metrics = [
    { label: "Active Subscriptions", value: 120, color: "#4caf50" },
    { label: "Monthly Revenue", value: "$5,000", color: "#2196f3" },
    { label: "Cancellations", value: 5, color: "#f44336" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Tarjetas de Métricas */}
      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric.label}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: metric.color,
                color: "#fff",
              }}
            >
              <Typography variant="h6">{metric.label}</Typography>
              <Typography variant="h4" fontWeight="bold">
                {metric.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Gráfico de Ingresos */}
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Revenue Trend
          </Typography>
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
