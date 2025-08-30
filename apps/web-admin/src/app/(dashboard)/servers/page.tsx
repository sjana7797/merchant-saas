import ServerList from "@/features/servers/components/server-list";

function ServersPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <ServerList />
    </main>
  );
}

export default ServersPage;
