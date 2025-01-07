"use client";

import { useState } from "react";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

import { Box, Typography, Paper, Snackbar, Button } from "@mui/material";

export default function UploadPage() {
    const [fileResponse, setFileResponse] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Upload a PDF"
                action={
                    <Button color="inherit" size="small" onClick={handleSnackbarClose}>
                        Close
                    </Button>
                }
            />
            <FilePond
                server={{
                    process: {
                        url: "/api/upload",
                        method: "POST",
                        withCredentials: false,
                        onload: (response) => {
                            // parse the json response
                            const fileResponse = JSON.parse(response);
                            setFileResponse(fileResponse);
                            return response; // Return the response to FilePond
                        },
                        onerror: (response) => {
                            return response; // Return the error to FilePond
                        },
                    },
                    fetch: null,
                    revert: null,
                }}
            />

            <Box mt={3}>
                {fileResponse ? (
                    <Paper sx={{ p: 3, backgroundColor: "grey.100" }}>
                        <Typography variant="h6" component="h1" fontWeight="bold">
                            Text from the PDF:
                        </Typography>

                        {/* @ts-expect-error - This is needed because it giving parsedText is not found on type never */}
                        <pre style={{ whiteSpace: "pre-wrap", padding: "16px" }}>{fileResponse.parsedText}</pre>
                    </Paper>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
                        <Typography variant="body2">Supported file types: PDF</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
