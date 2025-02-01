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
  };
}

async function getRepositories(name: string) {
  const data = await fetch(`https://api.github.com/users/${name}/repos`);

  return data.json();
}

export default async function Repositories({ params }: UsernameRequest) {
  const { userName } = await params;
  const data = await getRepositories(userName);

  return (
    <>
      {data.map((item: RepositoriesProps) => {
        return (
          <div
            key={item.id}
            className="border-[1px] rounded-lg border-[#d1d4d2] max-w-[400px] min-h-[100px]  m-3"
          >
            <p>Nome do repositório: {item.name}</p>
            <br />
            <p>Nome do usuário: {item.owner.login}</p>
          </div>
        );
      })}
    </>
  );
}
