import React from "react";
import { Typography, Box } from "@mui/material";
import { RepoItem } from "../RepoItem";
import { NextLink } from "../common/NextLink";

export type Props = {
  arrRepos?: Record<string, any>[];
  bLoading: boolean;
  nStrError: string | null;
};

export const ReposList = ({
  arrRepos,
  bLoading,
  nStrError,
}: Props): JSX.Element => {
  const renderReposList = () => {
    if (bLoading) return <Typography>Loading repos...</Typography>;
    if (nStrError) return <Typography>Error occured: {nStrError}</Typography>;

    if (!arrRepos || arrRepos.length === 0) {
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
  );
};
