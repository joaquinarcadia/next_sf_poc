import { NextAuthOptions } from "next-auth";
import SalesforceProvider from "next-auth/providers/salesforce";

export const authOptions: NextAuthOptions = {
    providers: [
        SalesforceProvider({
            clientId: process.env.SALESFORCE_CLIENT_ID ?? "",
            clientSecret: process.env.SALESFORCE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    redirect_uri: process.env.SALESFORCE_CALLBACK_URL ?? "",
                    scope: "api id web refresh_token",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }: { token: any; account: any }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.instanceUrl = account.instance_url;
            }

            return token;
        },

        async session({ session, token }: { session: any; token: any }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.instanceUrl = token.instanceUrl;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
