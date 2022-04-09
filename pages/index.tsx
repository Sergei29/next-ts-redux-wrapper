import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Container, Box, Typography } from "@mui/material";
import { actionGetUserRepos } from "../src/redux/actions/repos";
import { RootStateType, ReposStateType } from "../src/types";
import { useDispatch, useSelector } from "react-redux";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { arrRepos, bLoading, nStrError } = useSelector<
    RootStateType,
    ReposStateType
  >((state) => state.repos);

  useEffect(() => {
    // dispatch(actionGetUserRepos("Sergei29"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ backgroundColor: (theme) => theme.bg.main }}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box component="main">
        <Typography
          variant="h1"
          textAlign="center"
          sx={{ color: (theme) => theme.text.main }}
        >
          Homepage
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>repo list</Typography>
        </Box>
      </Box>

      <Box component="footer"></Box>
    </Container>
  );
};

export default Home;
