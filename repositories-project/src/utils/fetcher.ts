import useSWR from "swr";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  }).then((res) => res.json());

function User(username: string) {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/users/${username}`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

function RepositoriesUser(username: string) {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/users/${username}/repos`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export { RepositoriesUser, User };
