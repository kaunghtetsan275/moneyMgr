import React, { useEffect } from "react";
import { MockDataTransactions } from "../../constant/constant";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import dayjs from "dayjs";

function formatDateTime(dateString) {
  return dayjs(dateString).format("MMM D, YYYY h:mm A");
}

// Group transactions by day
function groupByDay(transactions) {
  const groups = {};
  transactions.forEach((tx) => {
    const dateObj = dayjs(tx.date);
    const day = dateObj.date();
    const month = dateObj.format("MM");
    const year = dateObj.year();
    const weekday = dateObj.format("ddd");
    const key = `${day}-${month}-${year}`;
    if (!groups[key]) {
      groups[key] = {
        day,
        month,
        year,
        weekday,
        transactions: [],
      };
    }
    groups[key].transactions.push(tx);
  });
  // Sort by day descending
  return Object.values(groups).sort((a, b) => b.day - a.day);
}

function getTotals(transactions) {
  if (!transactions || transactions.length === 0)
    return { income: "-", expense: "-" };
  let income = 0;
  let expense = 0;
  transactions.forEach((tx) => {
    if (tx.type === "Income") income += Number(tx.amount);
    else if (tx.type === "Expense") expense += Number(tx.amount);
  });
  return {
    income: income === 0 ? "-" : income,
    expense: expense === 0 ? "-" : expense,
  };
}

const TransactionView = () => {
  const transactions = MockDataTransactions;
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedTxId, setSelectedTxId] = React.useState(null);
  const [currentYear, setCurrentYear] = React.useState("");
  const [currentMonth, setCurrentMonth] = React.useState("");
  const queryClient = useQueryClient();

  const { isPending, data: transactionDetails } = useQuery({
    queryKey: ["getMonthlyTransactions", currentYear, currentMonth],
    queryFn: () =>
      fetch(
        `https://moneymgrbackend.onrender.com/api/data/${currentYear}/${currentMonth}`,
        { method: "GET", credentials: "include" }
      ).then((res) => res.json()),
    enabled: Boolean(currentYear && currentMonth),
  });

  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      const res = await fetch(
        `https://moneymgrbackend.onrender.com/api/data/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
    onSuccess: () => {
      setDeleteDialogOpen(false);
      setSelectedTxId(null);
      queryClient.invalidateQueries({ queryKey: ["getMonthlyTransactions"] });
      toast.success("Transaction deleted successfully");
    },
    onError: () => toast.error("Failed to delete transaction"),
  });

  useEffect(() => {
    const now = dayjs();
    setCurrentYear(now.year());
    setCurrentMonth(now.format("MMMM"));
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedTxId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => mutation.mutate({ id: selectedTxId });
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedTxId(null);
  };

  const totals = getTotals(transactionDetails?.data);

  if (isPending)
    return (
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          maxWidth: 800,
          mx: "auto",
          height: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="error" size={48} thickness={5} />
        <Typography variant="h6" color="error" mt={3}>
          Loading transactions...
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 800,
        mx: "auto",
        minHeight: "80vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={1}>
        Transactions
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Overview of your monthly transactions
      </Typography>
      <Box
        mb={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Year: <b>{currentYear}</b> | Month: <b>{currentMonth}</b>
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Income: <b style={{ color: "#43a047" }}>{totals.income}</b>
          <span style={{ color: "#757575", margin: "0 8px" }}>|</span>
          Expenses: <b style={{ color: "#ef5350" }}>{totals.expense}</b>
        </Typography>
      </Box>

      <Stack spacing={3}>
        {groupByDay(transactionDetails?.data || []).map((group) => (
          <Box key={group.day} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  bgcolor: "#23272f",
                  color: "#fff",
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  minWidth: 40,
                  textAlign: "center",
                  mr: 1,
                }}
              >
                {group.day}
              </Typography>
              <Chip
                label={group.weekday}
                size="small"
                sx={{
                  bgcolor: "#616161",
                  color: "#fff",
                  fontWeight: 600,
                  mr: 1,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {group.month}.{group.year}
              </Typography>
            </Box>
            <Stack spacing={1}>
              {group.transactions.map((tx) => (
                <Paper
                  key={tx._id}
                  elevation={2}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
                  }}
                >
                  {/* Icon */}
                  <Box sx={{ textAlign: "center", minWidth: 48 }}>
                    {tx.type === "Income" ? (
                      <ArrowUpwardIcon
                        sx={{ color: "#43a047" }}
                        fontSize="medium"
                      />
                    ) : (
                      <ArrowDownwardIcon
                        sx={{ color: "#ef5350" }}
                        fontSize="medium"
                      />
                    )}
                  </Box>
                  {/* Details */}
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {tx.category}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {tx.account}
                      </Typography>
                    </Stack>
                    {tx.note && (
                      <Typography variant="body2" color="text.secondary">
                        {tx.note}
                      </Typography>
                    )}
                  </Box>
                  {/* Amount */}
                  <Box sx={{ textAlign: "right", minWidth: 80 }}>
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      sx={{
                        color: tx.type === "Income" ? "#43a047" : "#ef5350",
                        fontSize: "1.1rem",
                      }}
                    >
                      {tx.type === "Income" ? "+" : "-"}
                      {tx.amount} {tx.currency}
                    </Typography>
                  </Box>
                  {/* Delete */}
                  <IconButton
                    onClick={() => handleDeleteClick(tx._id)}
                    sx={{
                      ml: 1,
                      color: "#fff",
                      bgcolor: "#ef5350",
                      "&:hover": { bgcolor: "#d32f2f" },
                      width: 32,
                      height: 32,
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Paper>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionView;
