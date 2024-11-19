import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

interface TransactionDetailsModalProps {
  open: boolean;
  onClose: () => void;
  transaction: {
    id: string;
    date: string;
    amount: string;
    subscriber: string;
    paymentMethod: string;
    stripeId?: string;
    refundInfo?: string;
    status: string;
  };
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  open,
  onClose,
  transaction,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Transaction Details</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Overview
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography>
              <strong>Transaction ID:</strong> {transaction.id}
            </Typography>
            <Typography>
              <strong>Date:</strong> {transaction.date}
            </Typography>
            <Typography>
              <strong>Amount:</strong> {transaction.amount}
            </Typography>
            <Typography>
              <strong>Status:</strong> {transaction.status}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Subscriber Details
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography>
              <strong>Subscriber:</strong> {transaction.subscriber}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Payment Information
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography>
              <strong>Payment Method:</strong> {transaction.paymentMethod}
            </Typography>
            {transaction.stripeId && (
              <Typography>
                <strong>Stripe Transaction ID:</strong> {transaction.stripeId}
              </Typography>
            )}
            {transaction.refundInfo && (
              <Typography>
                <strong>Refund Info:</strong> {transaction.refundInfo}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDetailsModal;
