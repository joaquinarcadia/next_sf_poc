"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Typography, Box } from "@mui/material";

export default function Login() {
    const { data: session } = useSession();

    return (
        <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Login with Salesforce
            </Typography>

            {session ? (
                <>
                    <Typography>Welcome, {session.user?.name}</Typography>
                    <Button variant="contained" color="secondary" onClick={() => signOut()}>
                        Logout
                    </Button>
                </>
            ) : (
                <Button variant="contained" color="primary" onClick={() => signIn("salesforce")}>
                    Login with Salesforce
                </Button>
            )}
        </Box>
    );
}
