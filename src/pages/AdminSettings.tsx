import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [userInfo, setUserInfo] = useState({
    username: "AdminUser",
    email: "admin@example.com",
    billingEmail: "billing@example.com",
  });
  const [theme, setTheme] = useState<string>("light");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [stripeConnected, setStripeConnected] = useState(false);
  const [stripeDetails, setStripeDetails] = useState({
    accountId: "",
    email: "",
  });

  // Event handlers
  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleUpdateInfo = () => {
    alert("User information updated!");
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated!");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleThemeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setTheme(e.target.value as string);
    alert(`Theme set to ${e.target.value}`);
  };

  const handleStripeConnect = () => {
    setTimeout(() => {
      setStripeConnected(true);
      setStripeDetails({
        accountId: "acct_123456789",
        email: "admin@stripe.com",
      });
    }, 1000);
  };

  const handleStripeDisconnect = () => {
    setStripeConnected(false);
    setStripeDetails({ accountId: "", email: "" });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Settings
      </Typography>

      {/* Tabs for section navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
        variant="scrollable"
      >
        <Tab label="Personal Information" />
        <Tab label="Change Password" />
        <Tab label="Theme Settings" />
        <Tab label="Stripe Integration" />
      </Tabs>

      {/* Tab Panels */}
      {activeTab === 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
          <TextField
            label="Billing Email"
            fullWidth
            margin="normal"
            value={userInfo.billingEmail}
            onChange={(e) =>
              setUserInfo({ ...userInfo, billingEmail: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateInfo}
          >
            Update Info
          </Button>
        </Paper>
      )}

      {activeTab === 1 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
          >
            Update Password
          </Button>
        </Paper>
      )}

      {activeTab === 2 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Theme Settings
          </Typography>
          <Select
            value={theme}
            onChange={handleThemeChange}
            displayEmpty
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
          <Typography variant="body2">
            The selected theme will be applied across the application.
          </Typography>
        </Paper>
      )}

      {activeTab === 3 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Stripe Integration
          </Typography>
          {stripeConnected ? (
            <Box>
              <Typography>
                <strong>Connected Account:</strong> {stripeDetails.email}
              </Typography>
              <Typography>
                <strong>Account ID:</strong> {stripeDetails.accountId}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
                onClick={handleStripeDisconnect}
              >
                Disconnect Stripe
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleStripeConnect}
            >
              Connect Stripe
            </Button>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default AdminSettings;
