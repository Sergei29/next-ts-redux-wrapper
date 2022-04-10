import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Container,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import useLazyRepos from "../src/hooks/useLazyRepos";
import useSearchForm from "../src/hooks/useSearchForm";
import useFavorites from "../src/hooks/useFavorites";
import RepoItem from "../src/modules/RepoItem";
import NextLink from "../src/modules/NextLink";
import FavoritesList from "../src/modules/FavoritesList";

const Home: NextPage = () => {
  const [handleFetchRepos, { arrRepos, bLoading, nStrError }] = useLazyRepos();

  const { strUserName, handleSubmit, handleChange, handleReset } =
    useSearchForm(handleFetchRepos);

  const { arrFavorites, handleRemoveFavorite } = useFavorites();

  const renderReposList = () => {
    if (bLoading) return <Typography>Loading repos...</Typography>;
    if (nStrError) return <Typography>Error occured: {nStrError}</Typography>;
    if (arrRepos.length === 0) {
      return (
        <Typography>
          Current user does not have any repository. Enter username to search
          for repos.
        </Typography>
      );
    }
    return arrRepos.map((repo) => (
      <NextLink
        key={repo.id}
        href="/repository/[...fullName]"
        as={`/repository/${repo.full_name}`}
        passHref
      >
        <RepoItem objRepo={repo} />
      </NextLink>
    ));
  };

  return (
    <Container sx={{ backgroundColor: (theme) => theme.bg.main }}>
      <Head>
        <title>Github Repos List</title>
        <meta
          name="description"
          content="Generated by create next app for Ennismore tech test"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box component="main">
        <Typography
          variant="h1"
          textAlign="center"
          sx={{ color: (theme) => theme.text.main, fontSize: "32px", my: 3 }}
        >
          Github Repositories
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {renderReposList()}
          </Box>
        </Box>
        <Divider sx={{ my: 5 }} />
        <Typography
          variant="h2"
          sx={{
            color: (theme) => theme.text.main,
            fontSize: "28px",
            marginBottom: 2,
          }}
        >
          Favorite repositories
        </Typography>
        <FavoritesList
          arrFavorites={arrFavorites}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      </Box>

      <Box component="footer"></Box>
    </Container>
  );
};

export default Home;
