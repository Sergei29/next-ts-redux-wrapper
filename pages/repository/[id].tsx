import { useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";

const RepositoryPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    console.log("query.id :>> ", query.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <h1>Repo page</h1>
    </div>
  );
};

export default RepositoryPage;
