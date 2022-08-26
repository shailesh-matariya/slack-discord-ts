import { Box } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { httpClient } from "../utils/Api";
import { TProps } from "../utils/AppTypes";

const AppLayout = ({ children }: TProps) => {
  const [primaryColor, setPrimaryColor] = useState();
  const logoUrl =
    "http://localhost:3001/_next/image?url=%2Fassets%2Fimages%2Ffleetdm-logo.png&w=128&q=75";

  const getConfig = () => {
    httpClient
      .get(`/brand-config`)
      .then((resp) =>
        setPrimaryColor(resp.data.brand_config.brand_primary_color)
      );
  };

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <>
      <Head>
        <title>Slack - Discord</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header primaryColor={primaryColor} />
      <Box className="container">{children}</Box>
    </>
  );
};

export default AppLayout;
