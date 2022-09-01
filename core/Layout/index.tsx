import { Box } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { httpClient } from "../utils/Api";
import { TProps } from "../utils/AppTypes";

const AppLayout = ({ children }: TProps) => {
  const [primaryColor, setPrimaryColor] = useState();
  const [logoUrl, setLogoUrl] = useState();

  const getConfig = () => {
    httpClient.get(`/brand-config`).then((resp) => {
      setPrimaryColor(resp.data.brand_config.brand_primary_color);
      setLogoUrl(resp.data.brand_config.brand_logo_url);

      const head = document.getElementsByTagName("head");
      console.log(resp.data.brand_config.brand_custom_code);

      return;
    });
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
      <Header primaryColor={primaryColor} logoUrl={logoUrl} />
      <Box className="container">{children}</Box>
    </>
  );
};

export default AppLayout;
