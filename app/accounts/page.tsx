"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress, List, ListItem, ListItemText, Typography, Alert } from "@mui/material";

import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const res = await fetch("/api/salesforce/accounts");

                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }

                const data = await res.json();

                console.log("!!!", data);

                setAccounts(data.recentItems || []);
            } catch (err: any) {
                console.log(err);

                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={2}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <ProtectedRoute>
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Salesforce Accounts
                </Typography>
                {accounts.length > 0 ? (
                    <List>
                        {accounts.map((account) => (
                            <ListItem key={account.Id}>
                                <ListItemText primary={account.Name} secondary={account.Industry || "Industry not specified"} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1">No accounts found.</Typography>
                )}
            </Box>
        </ProtectedRoute>
    );
}
