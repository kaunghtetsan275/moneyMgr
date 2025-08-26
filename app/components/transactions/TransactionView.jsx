import React from "react";
import { MockDataTransactions } from "../../constant/constant";
import { Box, Typography, Paper, Stack, Chip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const TransactionView = () => {
  const transactions = MockDataTransactions;

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 700,
        mx: "auto",
        minHeight: "80vh",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        color="text.primary"
      >
        Transaction Details
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Here you can view the details of your transactions.
      </Typography>

      <Stack spacing={3}>
        {transactions.map((tx, idx) => (
          <Paper
            key={idx}
            elevation={6}
            sx={{
              p: { xs: 2, sm: 3 },
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: "background.paper",
              borderLeft: `6px solid ${
                tx.type === "Income" ? "#43a047" : "#ef5350"
              }`,
              boxShadow: "0 4px 24px 0 rgba(25, 118, 210, 0.10)",
            }}
          >
            {/* Left side: Icon + Chip */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: 2,
              }}
            >
              {tx.type === "Income" ? (
                <ArrowUpwardIcon sx={{ color: "#43a047" }} fontSize="large" />
              ) : (
                <ArrowDownwardIcon sx={{ color: "#ef5350" }} fontSize="large" />
              )}
              <Chip
                label={tx.type}
                color={tx.type === "Income" ? "success" : "error"}
                size="small"
                sx={{ mt: 1, color: "#fff" }}
              />
            </Box>

            {/* Middle: Transaction details */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
              >
                {tx.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tx.note}
              </Typography>
              <Stack direction="row" spacing={2} mt={1}>
                <Typography variant="caption" color="text.secondary">
                  {tx.account}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {tx.currency}
                </Typography>
                <Typography variant="caption" color="text.primary">
                  {tx.date.toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Typography>
              </Stack>
            </Box>

            {/* Right side: Amount */}
            <Box sx={{ minWidth: 100, textAlign: "right" }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  background:
                    tx.type === "Income"
                      ? "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)"
                      : "linear-gradient(90deg, #ef5350 0%, #f48fb1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {tx.type === "Income" ? "+" : "-"}
                {tx.amount} {tx.currency}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default TransactionView;
