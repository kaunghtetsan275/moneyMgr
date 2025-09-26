import { Box, Modal, Fab, Tooltip } from "@mui/material";
import React, { useState } from "react";
import TransactionView from "./transactions/TransactionView";
import AddTransaction from "./transactions/AddTransaction";
import AddIcon from "@mui/icons-material/Add";

const Homepage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <TransactionView />
      <Tooltip title="Add Transaction" placement="left">
        <Fab
          aria-label="add"
          onClick={() => setAddModalOpen(true)}
          sx={{
            position: "fixed",
            right: 15,
            bottom: 25,
            zIndex: 1300,
            boxShadow: 4,
            color: "#fff",
            background: "linear-gradient(135deg, #ef5350 0%, #23272f 100%)",
            color: "#fff",
            boxShadow: 6,
            "&:hover": {
              background: "linear-gradient(135deg, #b71c1c 0%, #23272f 100%)",
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={addModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '& .MuiModal-backdrop': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Box sx={{ outline: "none" }}>
          <AddTransaction setAddModalOpen={setAddModalOpen} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Homepage;
