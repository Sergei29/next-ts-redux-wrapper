import React, { Fragment } from "react";
import { Container, Box, Typography } from "@mui/material";
import { Navigation } from "../../Navigation";

type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props): JSX.Element => (
  <Typography
    variant="h1"
    textAlign="center"
    sx={{ color: (theme) => theme.text.main, fontSize: "32px", my: 3 }}
  >
    {children}
  </Typography>
);

const PageContainer = ({ children }: Props): JSX.Element => {
  return (
    <Fragment>
      <Navigation />
      <Container
        sx={{ backgroundColor: (theme) => theme.bg.main, height: "100vh" }}
      >
        <Box component="main">{children}</Box>
      </Container>
    </Fragment>
  );
};

PageContainer.Title = Title;

export { PageContainer };
