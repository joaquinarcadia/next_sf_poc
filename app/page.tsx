import { getServerSession } from "next-auth";

export default async function Home() {
    const session = await getServerSession();

    return <>User image URL: {session?.user ? <div>{session?.user?.image}</div> : <div>Not logged in</div>}</>;
}
