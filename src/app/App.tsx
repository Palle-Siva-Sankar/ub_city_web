import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";


function AppShell() {
  const { theme } = useTheme();
  return (
    <>
      <ScrollToTop />
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" theme={theme} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}