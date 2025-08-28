import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import { useCategoryQuery } from "../../services/useCategoryServices";
import { darken } from "@mui/material/styles";

const CategoryList = ({ title, categories = [], color }) => {
  const darkBg = color ? darken(color, 0.5) : undefined;
  const hoverBg = color ? darken(color, 0.7) : undefined;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        minHeight: 220,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <CategoryIcon sx={{ color }} />
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <Chip label={categories.length} size="small" sx={{ ml: 1 }} />
        </Stack>
      </Stack>

      <Box sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          {categories.map((c) => (
            <Grid item key={c._id} xs={6} sm={4} md={3}>
              <Button
                variant="contained"
                disableElevation
                fullWidth
                sx={{
                  backgroundColor: darkBg || color,
                  bgcolor: darkBg || color,
                  color: "#fff",
                  borderRadius: 2,
                  p: 1.25,
                  textTransform: "none",
                  justifyContent: "flex-start",
                  border: `1px solid ${color}33`,
                  boxShadow: `0 6px 18px ${darkBg || color}33`,
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    backgroundColor: hoverBg || darkBg || color,
                    bgcolor: hoverBg || darkBg || color,
                    boxShadow: `0 14px 36px ${hoverBg || darkBg || color}55`,
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#fff" }}
                >
                  {c.name}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

const CategoryPage = () => {
  const {
    isPending,
    isError,
    data: categoriesFetched = [],
    refetch,
  } = useCategoryQuery();

  const incomeCats = (categoriesFetched || []).filter(
    (c) => c.categoryType === "Income"
  );
  const expenseCats = (categoriesFetched || []).filter(
    (c) => c.categoryType === "Expense"
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={800}>
          Categories
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => refetch()} aria-label="refresh">
            <RefreshIcon />
          </IconButton>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Category
          </Button>
        </Stack>
      </Stack>

      {isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error">Failed to load categories</Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid width={"100%"} item xs={12} sm={6}>
            <CategoryList
              title="Income"
              categories={incomeCats}
              color="#43a047"
            />
          </Grid>

          <Grid width={"100%"} item xs={12} sm={6}>
            <CategoryList
              title="Expense"
              categories={expenseCats}
              color="#ef5350"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CategoryPage;
