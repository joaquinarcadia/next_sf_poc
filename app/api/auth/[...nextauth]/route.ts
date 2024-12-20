import NextAuth from "next-auth";
import SalesforceProvider from "next-auth/providers/salesforce";

export const authOptions = {
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
    secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
