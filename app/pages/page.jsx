"use client";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Box from "@mui/material/Box";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/pages/home");
  }, [router]);

  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default Page;
