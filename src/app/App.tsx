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
    <ReactLenis root options={{ 
      lerp: 0.08, 
      duration: 1.1, 
      smoothWheel: true, 
      smoothTouch: true, 
      syncTouch: true,
      wheelMultiplier: 1.1, 
      touchMultiplier: 2.2, 
      orientation: 'vertical', 
      gestureOrientation: 'vertical' 
    }}>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </ReactLenis>
  );
}