import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";

import { fetchSalesforceData } from "@/app/services/salesforce";

import { authOptions } from "../../../lib/auth";

export async function GET() {
    const session = (await getServerSession(authOptions)) as any;

    if (!session || !session.accessToken || !session.instanceUrl) {
        return NextResponse.json(
            {
                error: "Not authenticated",
            },
            {
                status: 401,
            }
        );
    }

    const { accessToken, instanceUrl } = session as any;

    if (!accessToken || !instanceUrl) {
        console.error("Missing accessToken or instanceUrl:", { accessToken, instanceUrl });
        return NextResponse.json(
            {
                error: "Unauthorized - Missing credentials",
            },
            {
                status: 401,
            }
        );
    }

    try {
        const data = await fetchSalesforceData(instanceUrl, accessToken, "/sobjects/Account");

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error fetching Salesforce data:", error.message);

        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
