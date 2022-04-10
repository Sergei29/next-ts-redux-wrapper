import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Container, Box, Typography } from "@mui/material";
import useFavorites from "../../src/hooks/useFavorites";
import FavoritesList from "../../src/modules/FavoritesList";

const BookmarksPage: NextPage = () => {
  const { arrFavorites, handleRemoveFavorite } = useFavorites();
  return (
    <Container sx={{ backgroundColor: (theme) => theme.bg.main }}>
      <Head>
        <title>Github Bookmarks List</title>
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
          Bookmarked repositories
        </Typography>
        <FavoritesList
          arrFavorites={arrFavorites || []}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      </Box>

      <Box component="footer"></Box>
    </Container>
  );
};

export default BookmarksPage;
