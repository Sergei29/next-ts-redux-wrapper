import React, { Fragment } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { connect } from "react-redux";
import { Box, FormControl, TextField, Button } from "@mui/material";
import { RootStateType } from "../src/types";
import { ReposList } from "../src/components/ReposList";
import { PageContainer } from "../src/components/common/PageContainer";
import { useLazyRepos } from "../src/hooks/useLazyRepos";
import { useSearchForm } from "../src/hooks/useSearchForm";

const Home: NextPage = () => {
  const [handleFetchRepos, { arrRepos, bLoading, nStrError }] = useLazyRepos();

  const { strUserName, handleSubmit, handleChange, handleReset } =
    useSearchForm(handleFetchRepos);

  return (
    <Fragment>
      <Head>
        <title>Ennismore GitHub | Home</title>
        <meta name="description" content="Ennismore GitHub Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>Github Repositories</PageContainer.Title>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl>
              <TextField
                value={strUserName}
                label="username"
                onChange={handleChange}
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button type="submit">Search</Button>
              <Button onClick={handleReset} color="warning">
                Reset
              </Button>
            </Box>
          </Box>
          <ReposList
            arrRepos={arrRepos}
            bLoading={bLoading}
            nStrError={nStrError}
          />
        </Box>
      </PageContainer>
    </Fragment>
  );
};

export default connect((state: RootStateType) => state)(Home);
