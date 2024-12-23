"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button, Typography, Divider, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";

function AuthButton() {
    const { data: session } = useSession();

    return session ? (
        <>
            <Typography variant="body1">{session.user?.name}</Typography>
            <Button variant="contained" color="secondary" onClick={() => signOut()}>
                Sign out
            </Button>
        </>
    ) : (
        <Button variant="contained" color="primary" onClick={() => signIn()}>
            Sign in
        </Button>
    );
}

export default function NavMenu({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const routes = [
        { path: "/", label: "Home" },
        { path: "/accounts", label: "Accounts", protected: true },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "100vh",
                padding: 2,
            }}
        >
            <List
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 2,
                }}
            >
                {routes
                    .filter((route) => !route.protected || (route.protected && session))
                    .map(({ path, label }) => (
                        <Link key={path} href={path} passHref>
                            <ListItem disablePadding>
                                <ListItemButton
                                    selected={pathname === path}
                                    sx={{
                                        "&.Mui-selected": {
                                            backgroundColor: "gray.700",
                                            color: "white",
                                        },
                                        "&:hover": {
                                            backgroundColor: "gray.700",
                                            color: "white",
                                        },
                                    }}
                                >
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
            </List>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {children}
            </Box>

            <Box sx={{ marginTop: 2 }}>
                <Divider sx={{ width: "100%", marginBottom: 2 }} />
                <AuthButton />
            </Box>
        </Box>
    );
}
