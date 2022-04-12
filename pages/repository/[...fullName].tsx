import React, { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { connect } from "react-redux";
import { Store } from "redux";
import { Box, Typography } from "@mui/material";
import { actionGetRepoDetails } from "../../src/redux/actions/repos";
import { RootStateType, RepoType } from "../../src/types";
import { getLicenceData } from "../../src/utils";
import { wrapper } from "../../src/redux/store";
import { useFavorites } from "../../src/hooks/useFavorites";
import { PageContainer } from "../../src/components/common/PageContainer";
import { FavoriteButton } from "../../src/components/common/FavoriteButton";

type Props = { nObjSelectedRepo: null | RepoType };

const RepositoryPage: NextPage<Props> = ({ nObjSelectedRepo }) => {
  const { handleAddFavorite, isFavorite } = useFavorites();

  return (
    <Fragment>
      <Head>
        <title>Ennismore GitHub | Repository Details</title>
        <meta name="description" content="Ennismore GitHub Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>Repository</PageContainer.Title>
        {nObjSelectedRepo && (
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "22px",
                textAlign: "center",
                color: (theme) => theme.text.main,
                fontWeight: 600,
              }}
            >
              {nObjSelectedRepo?.name}
              <FavoriteButton
                bIsFavorite={isFavorite(nObjSelectedRepo?.full_name)}
                handleClick={() => handleAddFavorite(nObjSelectedRepo)}
              />
            </Typography>
            <Typography variant="caption" sx={{ textAlign: "center" }}>
              Description: {nObjSelectedRepo?.description || "not mentioned"}
            </Typography>
            <Typography variant="caption" sx={{ textAlign: "center" }}>
              License: {getLicenceData(nObjSelectedRepo?.license)}
            </Typography>
          </Box>
        )}
      </PageContainer>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { query } = ctx;
    if (!query.fullName)
      return {
        props: { nObjSelectedRepo: null },
      };
    const strFullName = (query.fullName as string[]).join("/");
    await (store as Store<RootStateType, any>).dispatch(
      actionGetRepoDetails(strFullName)
    );
    const { repos } = store.getState();

    return {
      props: { nObjSelectedRepo: repos.nObjSelectedRepo || null },
    };
  }
);

export default connect((state: RootStateType) => state)(RepositoryPage);
