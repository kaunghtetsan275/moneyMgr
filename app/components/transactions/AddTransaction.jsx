import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

const accountOptions = ["Cash", "Online"];

const AddTransaction = ({ setAddModalOpen }) => {
  const [form, setForm] = useState({
    dateTime: dayjs(),
    account: "Cash",
    category: "",
    note: "",
    type: "Expense",
    amount: "",
  });
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("Expense");

  const {
    isPending,
    isError,
    data: categoriesFetched,
    error,
    refetch,
  } = useQuery({
    queryKey: ["getCategories"],
    queryFn: () =>
      fetch("https://moneymgrbackend.onrender.com/api/category", {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
  });

  // Filter categories by type after fetch
  const filteredCategories = React.useMemo(() => {
    if (!categoriesFetched || !Array.isArray(categoriesFetched)) return [];
    return categoriesFetched.filter((cat) => cat.categoryType === form.type);
  }, [categoriesFetched, form.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleDateTimeChange = (newValue) => {
    setForm((prev) => ({ ...prev, dateTime: newValue }));
  };

  const handleTypeChange = (type) => {
    setForm((prev) => ({ ...prev, type, category: "" }));
  };

  const handleAddCategory = () => {
    setForm((prev) => ({ ...prev, category: newCategory.trim() }));
    setForm((prev) => ({
      ...prev,
      category: newCategory.trim(),
      type: newCategoryType,
    }));
    setNewCategory("");
    setNewCategoryType("Expense");
    setOpenCategoryModal(false);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1400,
        width: { xs: "90vw", sm: 500 },
        maxWidth: 500,
        outline: "none",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: form.type === "Income" ? "#23272f" : "#1e1e1e",
          transition: "background 0.3s",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <CloseIcon
            onClick={() => setAddModalOpen(false)}
            sx={{ cursor: "pointer", color: "grey.700" }}
          />
        </Box>
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
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
            mb: 3,
            p: 1,
            width: "100%",
            borderRadius: 3,
            background: "linear-gradient(145deg, #1e1e2f, #2a2a40)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleTypeChange("Income")}
            sx={{
              fontWeight: 600,
              borderRadius: 3,
              minWidth: 140,
              py: 1.5,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              background:
                form.type === "Income"
                  ? "linear-gradient(135deg, #43a047, #66bb6a)"
                  : "transparent",
              border: "2px solid #43a047",
              color: form.type === "Income" ? "#fff" : "#43a047",
              boxShadow:
                form.type === "Income"
                  ? "0 4px 12px rgba(67, 160, 71, 0.5)"
                  : "inset 0 0 0 rgba(0,0,0,0)",
              "&:hover": {
                background:
                  form.type === "Income"
                    ? "linear-gradient(135deg, #388e3c, #43a047)"
                    : "rgba(67, 160, 71, 0.1)",
              },
            }}
          >
            Income
          </Button>

          <Button
            variant="contained"
            onClick={() => handleTypeChange("Expense")}
            sx={{
              fontWeight: 600,
              borderRadius: 3,
              minWidth: 140,
              py: 1.5,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              background:
                form.type === "Expense"
                  ? "linear-gradient(135deg, #ef5350, #e57373)"
                  : "transparent",
              border: "2px solid #ef5350",
              color: form.type === "Expense" ? "#fff" : "#ef5350",
              boxShadow:
                form.type === "Expense"
                  ? "0 4px 12px rgba(239, 83, 80, 0.5)"
                  : "inset 0 0 0 rgba(0,0,0,0)",
              "&:hover": {
                background:
                  form.type === "Expense"
                    ? "linear-gradient(135deg, #d32f2f, #ef5350)"
                    : "rgba(239, 83, 80, 0.1)",
              },
            }}
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
              <FormLabel
                component="legend"
                sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
              >
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
                    control={
                      <Radio
                        sx={{
                          color: form.type === "Income" ? "#43a047" : "#ef5350",
                        }}
                      />
                    }
                    label={option}
                    sx={{ color: "text.primary" }}
                  />
                ))}
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
              >
                Category
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "150px",
                  width: "100%",
                  overflowY: "auto",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 1,
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {isPending ? (
                  <CircularProgress size={28} />
                ) : filteredCategories.length === 0 ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    No categories found.
                  </Typography>
                ) : (
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {filteredCategories.map((option) => (
                      <Button
                        key={option?._id}
                        variant={
                          form.category === option?.name
                            ? "contained"
                            : "outlined"
                        }
                        color={form.type === "Income" ? "success" : "error"}
                        sx={{
                          mb: 1,
                          borderRadius: 2,
                          textTransform: "none",
                          background:
                            form.category === option?.name
                              ? form.type === "Income"
                                ? "#43a047"
                                : "#ef5350"
                              : undefined,
                          color:
                            form.category === option?.name
                              ? "#fff"
                              : form.type === "Income"
                              ? "#43a047"
                              : "#ef5350",
                          boxShadow: "none",
                          backgroundImage: "none",
                        }}
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            category: option?.name,
                          }))
                        }
                      >
                        {option?.name}
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
                        backgroundImage: "none",
                      }}
                      onClick={() => setOpenCategoryModal(true)}
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      Add Category
                    </Button>
                  </Stack>
                )}
              </Box>
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
        <Modal
          open={openCategoryModal}
          onClose={() => setOpenCategoryModal(false)}
        >
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
            <FormLabel component="legend" sx={{ mt: 2, mb: 1 }}>
              Category Type
            </FormLabel>
            <RadioGroup
              row
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value)}
            >
              <FormControlLabel
                value="Income"
                control={<Radio color="success" />}
                label="Income"
              />
              <FormControlLabel
                value="Expense"
                control={<Radio color="error" />}
                label="Expense"
              />
            </RadioGroup>
            <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => setOpenCategoryModal(false)}
              >
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

export default AddTransaction;
