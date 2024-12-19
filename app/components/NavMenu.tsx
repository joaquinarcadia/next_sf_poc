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

export default function NavMenu() {
    const pathname = usePathname();

    const routes = [{ path: "/", label: "Home" }];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}
        >
            <List>
                {routes.map(({ path, label }) => (
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
            <Divider sx={{ width: "100%" }} />
            <AuthButton />
        </Box>
    );
}
