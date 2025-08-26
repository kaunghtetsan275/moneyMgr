import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  InputAdornment,
  Modal,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const accountOptions = ["Cash", "Online"];
const defaultCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Salary",
  "Other",
];

const Homepage = () => {
  const [form, setForm] = useState({
    dateTime: dayjs(),
    account: "Cash",
    category: "",
    note: "",
    type: "Income",
    amount: "",
  });
  const [categories, setCategories] = useState([...defaultCategories]);
  const [openModal, setOpenModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleDateTimeChange = (newValue) => {
    setForm((prev) => ({ ...prev, dateTime: newValue }));
  };

  const handleTypeChange = (type) => {
    setForm((prev) => ({ ...prev, type }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setForm((prev) => ({ ...prev, category: newCategory.trim() }));
    }
    setNewCategory("");
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        bgcolor: "#f5f6fa",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: "100%",
          bgcolor: form.type === "Income" ? "#e3fcec" : "#fff5f5",
          transition: "background 0.3s",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight={700}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          Money Manager
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 3, justifyContent: "center" }}
        >
          <Button
            variant={form.type === "Income" ? "contained" : "outlined"}
            color="success"
            onClick={() => handleTypeChange("Income")}
            sx={{ fontWeight: 600, borderRadius: 2, minWidth: 120 }}
          >
            Income
          </Button>
          <Button
            variant={form.type === "Expense" ? "contained" : "outlined"}
            color="error"
            onClick={() => handleTypeChange("Expense")}
            sx={{ fontWeight: 600, borderRadius: 2, minWidth: 120 }}
          >
            Expense
          </Button>
        </Stack>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date & Time"
                  value={form.dateTime}
                  onChange={handleDateTimeChange}
                  views={["year", "day", "hours", "minutes", "seconds"]}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
                Account
              </FormLabel>
              <RadioGroup
                row
                name="account"
                value={form.account}
                onChange={handleChange}
              >
                {accountOptions.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="primary" />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Category
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {categories.map((option) => (
                  <Button
                    key={option}
                    variant={
                      form.category === option ? "contained" : "outlined"
                    }
                    color={form.type === "Income" ? "success" : "error"}
                    sx={{ mb: 1, borderRadius: 2, textTransform: "none" }}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, category: option }))
                    }
                  >
                    {option}
                  </Button>
                ))}
                <Button
                  variant="outlined"
                  color="info"
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    minWidth: 40,
                    px: 1,
                  }}
                  onClick={() => setOpenModal(true)}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add Category
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Note"
                name="note"
                value={form.note}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="success" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color={form.type === "Income" ? "success" : "error"}
                fullWidth
                sx={{ mt: 2 }}
                disabled
              >
                Add Transaction
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              minWidth: 300,
            }}
          >
            <Typography variant="h6" mb={2}>
              Add New Category
            </Typography>
            <TextField
              label="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              fullWidth
              autoFocus
            />
            <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddCategory}
                disabled={!newCategory.trim()}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Paper>
    </Box>
  );
};

export default Homepage;
