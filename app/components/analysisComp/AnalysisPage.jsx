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
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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
  const [viewMode, setViewMode] = React.useState("monthly"); // 'monthly' | 'yearly'
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
    enabled: viewMode === "monthly" && Boolean(currentYear && currentMonth),
  });

  const { isPending: isPendingAllData, data: allTransactionData } = useQuery({
    queryKey: ["getAllTransactionData"],
    queryFn: () =>
      fetch(`https://moneymgrbackend.onrender.com/api/data`, {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
  });

  const pieDataExpense = React.useMemo(() => {
    const source =
      viewMode === "monthly"
        ? transactionDetails?.data
        : allTransactionData?.data;
    if (!source) return [];
    const sums = {};
    source.forEach((tx) => {
      if (viewMode === "yearly") {
        const txDate = dayjs(tx.date);
        if (txDate.year() !== Number(currentYear)) return;
      }
      if (tx.type !== "Expense") return;
      const category = tx.category || "Uncategorized";
      sums[category] = (sums[category] || 0) + Number(tx.amount || 0);
    });

    return Object.entries(sums).map(([category, value], idx) => ({
      id: idx,
      value,
      label: category,
    }));
  }, [transactionDetails, allTransactionData, viewMode, currentYear]);

  const pieDataIncome = React.useMemo(() => {
    const source =
      viewMode === "monthly"
        ? transactionDetails?.data
        : allTransactionData?.data;
    if (!source) return [];
    const sums = {};
    source.forEach((tx) => {
      if (viewMode === "yearly") {
        const txDate = dayjs(tx.date);
        if (txDate.year() !== Number(currentYear)) return;
      }
      if (tx.type !== "Income") return;
      const category = tx.category || "Uncategorized";
      sums[category] = (sums[category] || 0) + Number(tx.amount || 0);
    });

    return Object.entries(sums).map(([category, value], idx) => ({
      id: idx,
      value,
      label: category,
    }));
  }, [transactionDetails, allTransactionData, viewMode, currentYear]);

  const pieTotalExpense = React.useMemo(
    () => pieDataExpense.reduce((s, d) => s + Number(d.value || 0), 0),
    [pieDataExpense]
  );
  const pieIncomeTotal = React.useMemo(
    () => pieDataIncome.reduce((s, d) => s + Number(d.value || 0), 0),
    [pieDataIncome]
  );

  const currencyFmt = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });

  const barChartData = React.useMemo(() => {
    if (!allTransactionData?.data || !barYear || !barType) return [];

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
        width: "100%",
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
            labelId="view-mode-select-label"
            id="view-mode-select"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              minWidth: 110,
              bgcolor: "background.default",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
          <Select
            labelId="month-select-label"
            id="month-select"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            disabled={viewMode === "yearly"}
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
            gap: 2,
            minHeight: { xs: 180, sm: 220 },
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ textAlign: "center", width: 260 }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: "pie",
                  height: 220,
                  backgroundColor: "transparent",
                },
                title: {
                  text: "",
                },
                plotOptions: {
                  pie: {
                    innerSize: "50%",
                    dataLabels: {
                      enabled: true,
                      format: "{point.name}: {point.y}",
                      style: {
                        color: "white",
                        textOutline: "none",
                      },
                      backgroundColor: "none",
                      borderWidth: 0,
                      shadow: false,
                      padding: 0,
                      distance: 20,
                      connectorWidth: 1,
                      connectorColor: "#888",
                    },
                  },
                },
                series: [
                  {
                    name: "Expense",
                    data: pieDataExpense.length
                      ? pieDataExpense.map((item) => ({
                          name: item.label,
                          y: item.value,
                        }))
                      : [],
                  },
                ],
                lang: {
                  noData: "No data available",
                },
                noData: {
                  style: {
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "#666",
                  },
                },
              }}
            />
            <Box sx={{ mt: 1 }}>
              <div style={{ fontWeight: 700, color: "#ef5350" }}>Expense</div>
              <div style={{ color: "text.secondary" }}>
                {currencyFmt.format(pieTotalExpense)}
              </div>
            </Box>
          </Box>

          <Box sx={{ textAlign: "center", width: 260 }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: "pie",
                  height: 220,
                  backgroundColor: "transparent",
                },
                title: {
                  text: "",
                },
                plotOptions: {
                  pie: {
                    innerSize: "50%",
                    dataLabels: {
                      enabled: true,
                      format: "{point.name}: {point.y}",
                      style: {
                        color: "white",
                        textOutline: "none",
                      },
                      backgroundColor: "none",
                      borderWidth: 0,
                      shadow: false,
                      padding: 0,
                      distance: 20,
                      connectorWidth: 1,
                      connectorColor: "#888",
                    },
                  },
                },
                series: [
                  {
                    name: "Income",
                    data: pieDataIncome.length
                      ? pieDataIncome.map((item) => ({
                          name: item.label,
                          y: item.value,
                        }))
                      : [],
                  },
                ],
                lang: {
                  noData: "No data available",
                },
                noData: {
                  style: {
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "#666",
                  },
                },
              }}
            />
            <Box sx={{ mt: 1 }}>
              <div style={{ fontWeight: 700, color: "#43a047" }}>Income</div>
              <div style={{ color: "text.secondary" }}>
                {currencyFmt.format(pieIncomeTotal)}
              </div>
            </Box>
          </Box>
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
            <Box
              sx={{
                width: barChartData.length > 8 ? 420 : 320,
                height: 240,
                bgcolor: "background.default",
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
              }}
            >
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "column",
                    backgroundColor: "transparent",
                    height: 220,
                  },
                  title: {
                    text:
                      barType === "Expense"
                        ? "Monthly Expense"
                        : "Monthly Income",
                  },
                  xAxis: {
                    categories: barChartData.map((item) => item.month),
                    title: {
                      text: "Month",
                    },
                  },
                  yAxis: {
                    title: {
                      text: "Amount (THB)",
                    },
                  },
                  series: [
                    {
                      name: barType,
                      data: barChartData.map((item) => item.value),
                      color: barType === "Expense" ? "#ef5350" : "#43a047",
                    },
                  ],
                  credits: {
                    enabled: false,
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AnalysisPage;
