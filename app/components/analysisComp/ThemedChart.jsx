"use client";
import React from "react";
import { useTheme } from "next-themes";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const ThemedChart = ({ options, type = "pie", ...props }) => {
  const { resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Better theme detection
  const isDark = mounted 
    ? resolvedTheme === "dark" 
    : false; // Default to light during SSR

  const getThemeAwareOptions = (originalOptions) => {
    const textColor = isDark ? "#ffffff" : "#333333";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
    const lineColor = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";

    return {
      ...originalOptions,
      chart: {
        ...originalOptions.chart,
        backgroundColor: "transparent",
      },
      title: {
        ...originalOptions.title,
        style: {
          ...originalOptions.title?.style,
          color: textColor,
        },
      },
      xAxis: originalOptions.xAxis ? {
        ...originalOptions.xAxis,
        title: {
          ...originalOptions.xAxis.title,
          style: {
            ...originalOptions.xAxis.title?.style,
            color: textColor,
          },
        },
        labels: {
          ...originalOptions.xAxis.labels,
          style: {
            ...originalOptions.xAxis.labels?.style,
            color: textColor,
          },
        },
        lineColor: lineColor,
        tickColor: lineColor,
      } : undefined,
      yAxis: originalOptions.yAxis ? {
        ...originalOptions.yAxis,
        title: {
          ...originalOptions.yAxis.title,
          style: {
            ...originalOptions.yAxis.title?.style,
            color: textColor,
          },
        },
        labels: {
          ...originalOptions.yAxis.labels,
          style: {
            ...originalOptions.yAxis.labels?.style,
            color: textColor,
          },
        },
        gridLineColor: gridColor,
      } : undefined,
      plotOptions: {
        ...originalOptions.plotOptions,
        pie: originalOptions.plotOptions?.pie ? {
          ...originalOptions.plotOptions.pie,
          dataLabels: {
            ...originalOptions.plotOptions.pie.dataLabels,
            style: {
              ...originalOptions.plotOptions.pie.dataLabels?.style,
              color: "#ffffff",
              textOutline: "1px contrast",
            },
          },
        } : undefined,
      },
      tooltip: {
        ...originalOptions.tooltip,
        backgroundColor: isDark ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)",
        style: {
          ...originalOptions.tooltip?.style,
          color: textColor,
        },
      },
    };
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getThemeAwareOptions(options)}
      {...props}
    />
  );
};

export default ThemedChart;