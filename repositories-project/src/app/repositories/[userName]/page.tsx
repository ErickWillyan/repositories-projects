import Image from "next/image";

import CardRepositories from "@/components/CardRepositories";

interface UsernameRequest {
  params: {
    userName: string;
  };
}

interface RepositoriesProps {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  language: string;
}

async function getRepositories(name: string) {
  const data = await fetch(`https://api.github.com/users/${name}/repos`);

  return data.json();
}

export default async function Repositories({ params }: UsernameRequest) {
  const { userName } = await params;
  const response = await getRepositories(userName);

  const data: RepositoriesProps[] = await response;

  console.log(data[0].owner.avatar_url);

  return (
    <>
      <Image
        src={data[0].owner.avatar_url}
        alt={data[0].name}
        width={50}
        height={50}
      />
      <div className="grid grid-cols-[1fr_1fr] justify-items-center w-[50%]  m-auto">
        {response.map((item: RepositoriesProps) => {
          return <CardRepositories key={item.id} data={item} />;
        })}
      </div>
    </>
  );
}
