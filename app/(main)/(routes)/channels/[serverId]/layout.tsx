import ServerSidebar from "@/components/server/ServerSidebar";

async function ServerLayout({
  children,
  params
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">
        { children }
      </main>
    </div>
  );
}

export default ServerLayout;
