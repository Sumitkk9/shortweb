"use client"; // Ensure this is a client component

import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Create Alert Context
const AlertContext = createContext();

// Alert Provider Component
export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

// Custom Hook to Use Alert Context
export function useAlert() {
  return useContext(AlertContext);
}
