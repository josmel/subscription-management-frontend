import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Chip,
} from "@mui/material";

interface Plan {
  id: number;
  name: string;
  price: number;
  status: string; // Active or Inactive
  subscribers: number;
}

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([
    { id: 1, name: "Basic Plan", price: 10, status: "Active", subscribers: 5 },
    { id: 2, name: "Pro Plan", price: 30, status: "Inactive", subscribers: 12 },
  ]);

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [formValues, setFormValues] = useState({ name: "", price: "" });

  const handleOpen = (plan: Plan | null = null) => {
    if (plan) {
      setIsEditing(true);
      setCurrentPlan(plan);
      setFormValues({ name: plan.name, price: plan.price.toString() });
    } else {
      setIsEditing(false);
      setFormValues({ name: "", price: "" });
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (
      !formValues.name ||
      !formValues.price ||
      parseFloat(formValues.price) <= 0
    ) {
      alert("Please provide a valid name and a price greater than zero.");
      return;
    }

    if (isEditing && currentPlan) {
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === currentPlan.id
            ? {
                ...plan,
                name: formValues.name,
                price: parseFloat(formValues.price),
              }
            : plan
        )
      );
    } else {
      setPlans((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: formValues.name,
          price: parseFloat(formValues.price),
          status: "Active",
          subscribers: 0,
        },
      ]);
    }

    setOpen(false);
    setFormValues({ name: "", price: "" });
  };

  const handleDelete = (id: number) => {
    const planToDelete = plans.find((plan) => plan.id === id);
    if (planToDelete?.subscribers > 0) {
      alert("You cannot delete a plan with active subscribers.");
      return;
    }
    setPlans((prev) => prev.filter((plan) => plan.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              status: plan.status === "Active" ? "Inactive" : "Active",
            }
          : plan
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Subscription Plans
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen(null)}
        sx={{ mb: 3 }}
      >
        Add Plan
      </Button>
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">{plan.name}</Typography>
              <Typography>Price: ${plan.price.toFixed(2)}/month</Typography>
              <Typography>Subscribers: {plan.subscribers}</Typography>
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={plan.status}
                  color={plan.status === "Active" ? "success" : "default"}
                  variant="outlined"
                />
              </Box>
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(plan)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleToggleStatus(plan.id)}
                >
                  {plan.status === "Active" ? "Disable" : "Enable"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(plan.id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog para añadir o editar planes */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditing ? "Edit Plan" : "Add Plan"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
          <TextField
            label="Price (USD)"
            type="number"
            fullWidth
            margin="normal"
            value={formValues.price}
            onChange={(e) =>
              setFormValues({ ...formValues, price: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {isEditing ? "Save Changes" : "Add Plan"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SubscriptionPlans;
