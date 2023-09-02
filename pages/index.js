import Head from "next/head";

import { Grid } from "@mui/material";
import Contianer from "../Component/Container";

export default function Home() {
  return (
    <>
      <Head>
        <title>IntelliRecruit</title>
        <meta
          name='description'
          content=' IntelliRecruit is your go-to HR solution for a smarter and more
          efficient hiring process. Harnessing the power of GPT-3 advanced
          text analysis capabilities, IntelliRecruit automates resume screening
          based on job descriptions, ensuring precision and relevance in
          candidate evaluation. Our intuitive dashboard provides insightful
          analytics, empowering you to make data-driven hiring decisions
          effortlessly. Say goodbye to manual screening and hello to intelligent
          recruiting with IntelliRecruit.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/icon-256x256.png' />
      </Head>
      <Grid
        container
        sx={{
          backgroundColor: "#212121",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Contianer />
      </Grid>
    </>
  );
}
