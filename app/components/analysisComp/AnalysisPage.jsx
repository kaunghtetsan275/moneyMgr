import {
  Box,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import TitleHeader from "../header/TitleHeader";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Years = Array.from({ length: 10 }, (_, i) => 2029 - i);

const AnalysisPage = () => {
  const [currentYear, setCurrentYear] = React.useState("");
  const [currentMonth, setCurrentMonth] = React.useState("");
  // For BarChart: track selected year and type
  const [barYear, setBarYear] = React.useState("");
  const [barType, setBarType] = React.useState("Expense");

  useEffect(() => {
    const now = dayjs();
    setCurrentYear(now.year());
    setCurrentMonth(now.format("MMMM"));
    setBarYear(now.year());
  }, []);

  const {
    isPending,
    data: transactionDetails,
    isError,
  } = useQuery({
    queryKey: ["getTransactionData", currentYear, currentMonth],
    queryFn: () =>
      fetch(
        `https://moneymgrbackend.onrender.com/api/data/${currentYear}/${currentMonth}`,
        { method: "GET", credentials: "include" }
      ).then((res) => res.json()),
    enabled: Boolean(currentYear && currentMonth),
  });

  // Convert transaction data to PieChart format
  const pieData = React.useMemo(() => {
    if (!transactionDetails?.data) return [];
    const sums = {};
    transactionDetails.data.forEach((tx) => {
      if (!sums[tx.category]) sums[tx.category] = 0;
      sums[tx.category] += Number(tx.amount);
    });
    // Convert to PieChart format
    return Object.entries(sums).map(([category, value], idx) => ({
      id: idx,
      value,
      label: category,
    }));
  }, [transactionDetails]);

  const { isPending: isPendingAllData, data: allTransactionData } = useQuery({
    queryKey: ["getAllTransactionData"],
    queryFn: () =>
      fetch(`https://moneymgrbackend.onrender.com/api/data`, {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
  });

  // BarChart data transformation: monthly spend for selected year
  const barChartData = React.useMemo(() => {
    if (!allTransactionData?.data || !barYear || !barType) return [];
    // Group by month for selected year and selected type
    const monthlySums = Array(12).fill(0); // Jan-Dec
    allTransactionData.data.forEach((tx) => {
      const txDate = dayjs(tx.date);
      if (txDate.year() === Number(barYear) && tx.type === barType) {
        monthlySums[txDate.month()] += Number(tx.amount);
      }
    });
    return monthlySums.map((sum, idx) => ({
      month: Months[idx],
      value: sum,
    }));
  }, [allTransactionData, barYear, barType]);

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: 600, md: 800 },
        mx: "auto",
        mt: { xs: 1, sm: 3 },
        p: { xs: 1, sm: 3 },
        bgcolor: "background.paper",
        borderRadius: { xs: 0, sm: 3 },
        boxShadow: { xs: 0, sm: 4 },
        minHeight: { xs: 300, sm: 400 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TitleHeader text="Data Visualization" />
      {/* PieChart Section */}
      <Box sx={{ width: "100%", mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            mt: { xs: 1, sm: 2 },
            mb: { xs: 1, sm: 2 },
          }}
        >
          <Select
            labelId="year-select-label"
            id="year-select"
            value={currentYear}
            onChange={(e) => setCurrentYear(e.target.value)}
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              minWidth: 90,
              bgcolor: "background.default",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            {Years.map((year, index) => (
              <MenuItem
                key={index}
                value={year}
                sx={{ fontSize: { xs: "0.95rem", sm: "1.05rem" } }}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
          <Select
            labelId="month-select-label"
            id="month-select"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              minWidth: 110,
              bgcolor: "background.default",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            {Months.map((month, index) => (
              <MenuItem
                key={index}
                value={month}
                sx={{ fontSize: { xs: "0.95rem", sm: "1.05rem" } }}
              >
                {month}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: { xs: 180, sm: 220 },
          }}
        >
          <PieChart
            series={[
              {
                data: pieData,
                innerRadius: 40,
                outerRadius: 90,
                paddingAngle: 2,
                cornerRadius: 6,
                label: ({ label, value }) => `${label}: ${value}`,
                labelLine: { stroke: "#888", strokeWidth: 1 },
              },
            ]}
            width={260}
            height={220}
            hideLegend
          />
        </Box>
        {isPending && (
          <Box sx={{ mt: 2, textAlign: "center", width: "100%" }}>
            <span style={{ color: "#ef5350", fontWeight: 600 }}>
              Loading data...
            </span>
          </Box>
        )}
        {isError && (
          <Box sx={{ mt: 2, textAlign: "center", width: "100%" }}>
            <span style={{ color: "#ef5350", fontWeight: 600 }}>
              Error loading data.
            </span>
          </Box>
        )}
      </Box>
      {/* BarChart Section */}
      <Box sx={{ width: "100%", mt: { xs: 2, sm: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            mb: { xs: 1, sm: 2 },
          }}
        >
          <Select
            labelId="bar-year-select-label"
            id="bar-year-select"
            value={barYear}
            onChange={(e) => setBarYear(e.target.value)}
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              minWidth: 90,
              bgcolor: "background.default",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            {Years.map((year, index) => (
              <MenuItem
                key={index}
                value={year}
                sx={{ fontSize: { xs: "0.95rem", sm: "1.05rem" } }}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
          <RadioGroup
            row
            value={barType}
            onChange={(e) => setBarType(e.target.value)}
            sx={{ ml: { sm: 2 }, gap: 2 }}
          >
            <FormControlLabel
              value="Expense"
              control={
                <Radio
                  sx={{
                    color: "#ef5350",
                    "&.Mui-checked": { color: "#ef5350" },
                  }}
                />
              }
              label="Expense"
            />
            <FormControlLabel
              value="Income"
              control={
                <Radio
                  sx={{
                    color: "#43a047",
                    "&.Mui-checked": { color: "#43a047" },
                  }}
                />
              }
              label="Income"
            />
          </RadioGroup>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: { xs: 180, sm: 220 },
          }}
        >
          {isPendingAllData ? (
            <span style={{ color: "#ef5350", fontWeight: 600 }}>
              Loading chart...
            </span>
          ) : (
            <BarChart
              dataset={barChartData}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "month",
                  label: "Month",
                  tickLabelStyle: { fontSize: "0.95rem" },
                  minCategoryGap: 0.2,
                  tickPlacement: "middle",
                },
              ]}
              series={[
                {
                  dataKey: "value",
                  label:
                    barType === "Expense"
                      ? "Monthly Expense"
                      : "Monthly Income",
                  color: barType === "Expense" ? "#ef5350" : "#43a047",
                },
              ]}
              width={barChartData.length > 8 ? 420 : 320}
              height={240}
              sx={{
                bgcolor: "background.default",
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AnalysisPage;
