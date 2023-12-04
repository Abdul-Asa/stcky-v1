//write a layout page for a nextjs app

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen">app{children}</div>;
}
