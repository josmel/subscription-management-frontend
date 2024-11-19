import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface Transaction {
  id: string;
  date: string;
  amount: string;
  subscriber: string;
  status: string; // "Completed", "Failed", "Refunded"
  paymentMethod?: string;
  stripeId?: string;
  refundInfo?: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      date: "2024-01-15",
      amount: "$100.00",
      subscriber: "John Doe",
      status: "Completed",
      paymentMethod: "Credit Card",
      stripeId: "ch_123456789",
      refundInfo: "No refunds",
    },
    {
      id: "TXN002",
      date: "2024-01-18",
      amount: "$50.00",
      subscriber: "Jane Smith",
      status: "Failed",
      paymentMethod: "PayPal",
    },
    {
      id: "TXN003",
      date: "2024-02-05",
      amount: "$75.00",
      subscriber: "Alice Johnson",
      status: "Refunded",
      paymentMethod: "Credit Card",
      stripeId: "ch_987654321",
      refundInfo: "Refunded on 2024-02-10",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterSubscriber, setFilterSubscriber] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesStatus =
      filterStatus === "All" || transaction.status === filterStatus;
    const matchesSubscriber = transaction.subscriber
      .toLowerCase()
      .includes(filterSubscriber.toLowerCase());
    const matchesDate =
      (!startDate || new Date(transaction.date) >= new Date(startDate)) &&
      (!endDate || new Date(transaction.date) <= new Date(endDate));
    return matchesStatus && matchesSubscriber && matchesDate;
  });

  const handleOpenModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = [
      "Transaction ID,Date,Amount,Subscriber,Status,Payment Method,Stripe ID,Refund Info",
    ];
    const rows = filteredTransactions.map(
      (transaction) =>
        `${transaction.id},${transaction.date},${transaction.amount},${
          transaction.subscriber
        },${transaction.status},${transaction.paymentMethod || "N/A"},${
          transaction.stripeId || "N/A"
        },${transaction.refundInfo || "N/A"}`
    );

    const csvContent = [...headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <TextField
          label="Subscriber"
          value={filterSubscriber}
          onChange={(e) => setFilterSubscriber(e.target.value)}
          variant="outlined"
        />
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          displayEmpty
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Failed">Failed</MenuItem>
          <MenuItem value="Refunded">Refunded</MenuItem>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Apply Filters")}
        >
          Apply
        </Button>
        {/* Export button aligned to the right */}
        <Box sx={{ marginLeft: "auto" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleExportCSV}
          >
            Export to CSV
          </Button>
        </Box>
      </Box>

      {/* Transactions Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Subscriber</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.subscriber}</TableCell>
                <TableCell
                  sx={{
                    color:
                      transaction.status === "Completed"
                        ? "green"
                        : transaction.status === "Failed"
                        ? "red"
                        : "orange",
                  }}
                >
                  {transaction.status}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenModal(transaction)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogContent>
            <Typography>
              <strong>Transaction ID:</strong> {selectedTransaction.id}
            </Typography>
            <Typography>
              <strong>Date:</strong> {selectedTransaction.date}
            </Typography>
            <Typography>
              <strong>Amount:</strong> {selectedTransaction.amount}
            </Typography>
            <Typography>
              <strong>Subscriber:</strong> {selectedTransaction.subscriber}
            </Typography>
            <Typography>
              <strong>Status:</strong> {selectedTransaction.status}
            </Typography>
            <Typography>
              <strong>Payment Method:</strong>{" "}
              {selectedTransaction.paymentMethod || "N/A"}
            </Typography>
            {selectedTransaction.stripeId && (
              <Typography>
                <strong>Stripe ID:</strong> {selectedTransaction.stripeId}
              </Typography>
            )}
            {selectedTransaction.refundInfo && (
              <Typography>
                <strong>Refund Info:</strong> {selectedTransaction.refundInfo}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Transactions;
