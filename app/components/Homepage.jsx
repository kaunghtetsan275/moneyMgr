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
            right: 32,
            bottom: 32,
            zIndex: 1300,
            boxShadow: 4,
            backgroundColor: "red",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={addModalOpen}
        // onClose={() => setAddModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ outline: "none" }}>
          <AddTransaction setAddModalOpen={setAddModalOpen} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Homepage;
