import NextAuth from "next-auth";
import SalesforceProvider from "next-auth/providers/salesforce";

export const authOptions = {
    providers: [
        SalesforceProvider({
            clientId: process.env.SALESFORCE_CLIENT_ID ?? "",
            clientSecret: process.env.SALESFORCE_CLIENT_SECRET ?? "",
            authorization: {
                url: `${process.env.SALESFORCE_AUTH_URL}/services/oauth2/authorize`,
                params: {
                    response_type: "code",
                    redirect_uri: process.env.SALESFORCE_CALLBACK_URL ?? "",
                },
            },
            token: `${process.env.SALESFORCE_AUTH_URL}/services/oauth2/token`,
            userinfo: `${process.env.SALESFORCE_AUTH_URL}/services/oauth2/userinfo`,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
