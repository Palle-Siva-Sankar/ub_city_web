import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { ReactLenis } from 'lenis/react';

function AppShell() {
  const { theme } = useTheme();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" theme={theme} />
    </>
  );
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.11, duration: 1.2, smoothWheel: true, syncTouch: false }}>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </ReactLenis>
  );
}