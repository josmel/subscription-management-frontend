import React, { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Select,
  MenuItem,
} from "@mui/material";

interface Subscriber {
  id: number;
  name: string;
  email: string;
  status: string;
  history?: { date: string; amount: string }[];
}

const Subscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      history: [
        { date: "2024-01-01", amount: "$100" },
        { date: "2024-02-01", amount: "$100" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Suspended",
      history: [{ date: "2024-01-15", amount: "$200" }],
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      status: "Cancelled",
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentSubscriber, setCurrentSubscriber] = useState<Subscriber | null>(
    null
  );
  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<Subscriber | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<Subscriber | null>(null);

  const handleOpen = (subscriber: Subscriber | null = null) => {
    if (subscriber) {
      setIsEditing(true);
      setCurrentSubscriber(subscriber);
      setFormValues({ name: subscriber.name, email: subscriber.email });
    } else {
      setIsEditing(false);
      setFormValues({ name: "", email: "" });
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (!formValues.name || !formValues.email) {
      alert("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      alert("Invalid email format.");
      return;
    }

    if (isEditing && currentSubscriber) {
      setSubscribers((prev) =>
        prev.map((sub) =>
          sub.id === currentSubscriber.id
            ? { ...sub, name: formValues.name, email: formValues.email }
            : sub
        )
      );
    } else {
      setSubscribers((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: formValues.name,
          email: formValues.email,
          status: "Active",
        },
      ]);
    }

    setOpen(false);
    setFormValues({ name: "", email: "" });
  };

  const handleSuspendActivate = (id: number, currentStatus: string) => {
    setSubscribers((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: currentStatus === "Active" ? "Suspended" : "Active",
            }
          : sub
      )
    );
  };

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesFilter = filter === "All" || subscriber.status === filter;
    const matchesSearch = subscriber.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleViewDetails = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsDetailsOpen(true);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Name", "Email", "Status"],
      ...filteredSubscribers.map((sub) => [
        sub.id,
        sub.name,
        sub.email,
        sub.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
  };

  const handleConfirmDelete = (subscriber: Subscriber) => {
    setDeleteConfirmation(subscriber);
  };

  const handleDeleteConfirmed = () => {
    if (deleteConfirmation) {
      setSubscribers((prev) =>
        prev.filter((sub) => sub.id !== deleteConfirmation.id)
      );
      setDeleteConfirmation(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Subscribers
      </Typography>

      {/* Filtros y Exportación */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Suspended">Suspended</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleExportCSV}
            sx={{ mr: 2 }}
          >
            Export to CSV
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(null)}
          >
            Add Subscriber
          </Button>
        </Box>
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.id}</TableCell>
                <TableCell>{subscriber.name}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        subscriber.status === "Active"
                          ? "green"
                          : subscriber.status === "Suspended"
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {subscriber.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpen(subscriber)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() =>
                      handleSuspendActivate(subscriber.id, subscriber.status)
                    }
                  >
                    {subscriber.status === "Active" ? "Suspend" : "Activate"}
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleConfirmDelete(subscriber)}
                  >
                    Delete
                  </Button>
                  <Button onClick={() => handleViewDetails(subscriber)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog para editar/agregar */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {isEditing ? "Edit Subscriber" : "Add Subscriber"}
        </DialogTitle>
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
            label="Email"
            fullWidth
            margin="normal"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {isEditing ? "Save Changes" : "Add Subscriber"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para detalles */}
      <Dialog open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
        <DialogTitle>Subscriber Details</DialogTitle>
        {selectedSubscriber && (
          <DialogContent>
            <Typography variant="h6">
              Name: {selectedSubscriber.name}
            </Typography>
            <Typography>Email: {selectedSubscriber.email}</Typography>
            <Typography>Status: {selectedSubscriber.status}</Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Payment History
              </Typography>
              {selectedSubscriber.history?.length ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedSubscriber.history.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No payment history available.</Typography>
              )}
            </Box>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para confirmar eliminación */}
      <Dialog
        open={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {deleteConfirmation?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(null)}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Subscribers;
