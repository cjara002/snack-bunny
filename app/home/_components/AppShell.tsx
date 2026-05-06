import AdaptiveNav from "./AdaptiveNav";

interface AppShellProps {
  children: React.ReactNode;
  activeNav?: string;
}

const AppShell = ({ children, activeNav = "today" }: AppShellProps) => (
  <div className="min-h-screen bg-linear-to-b from-[#fff9f5] to-[#ffe8dc]">
    <AdaptiveNav active={activeNav} />
    <main className="flex flex-col min-h-dvh px-5 pb-24 pt-4 md:pl-60 md:pb-8">
      <div className="flex flex-col flex-1 max-w-160 mx-auto w-full">{children}</div>
    </main>
  </div>
);

export default AppShell;
