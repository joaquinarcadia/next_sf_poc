import { getServerSession } from "next-auth";

export default async function Home() {
    const session = await getServerSession();

    return <>{session?.user?.name && <div>{session?.user?.name}</div>}</>;
}
