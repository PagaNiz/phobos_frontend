import Header from "@/components/header";
import { AuthProvider } from "@/provider/auth";
import { ThemeContextProvider } from "@/provider/ThemeContext";
import "@/styles/globals.scss";
import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <ToastContainer position={"bottom-right"} />
        <Header />
        <Container style={{ marginTop: "1.5rem" }}>
          <Component {...pageProps} />
        </Container>
      </ThemeContextProvider>
    </AuthProvider>
  );
}
