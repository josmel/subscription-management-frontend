import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth(); // Access login function from AuthContext
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus((prev) => ({ ...prev, error: "" })); // Clear errors on input
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    const { email, password } = form;

    if (!email || !password) {
      setStatus({ ...status, error: "Please fill in both fields." });
      return;
    }

    if (!validateEmail(email)) {
      setStatus({ ...status, error: "Invalid email format." });
      return;
    }

    setStatus({ ...status, loading: true, error: "" });

    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        login(); // Call login from AuthContext
        setStatus({ ...status, success: true, loading: false });
        setTimeout(() => navigate("/dashboard"), 1500); // Redirect after success
      } else {
        setStatus({
          ...status,
          error: "Invalid credentials. Try 'test@example.com' and 'password'.",
          loading: false,
        });
      }
    }, 1000);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Login
          </Typography>
        </Box>

        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleInputChange}
          error={!!status.error}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleInputChange}
          error={!!status.error}
        />

        {status.error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {status.error}
          </Typography>
        )}

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={status.loading}
          >
            {status.loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={status.success}
        autoHideDuration={3000}
        onClose={() => setStatus((prev) => ({ ...prev, success: false }))}
      >
        <Alert
          onClose={() => setStatus((prev) => ({ ...prev, success: false }))}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login Successful! Redirecting...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
