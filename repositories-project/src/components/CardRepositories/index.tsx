interface RepositoriesProps {
  data: {
    id: number;
    name: string;
    owner: {
      login: string;
    };
    html_url: string;
    description: string;
    language: string;
    avatar_url: string;
  };
}

export default function CardRepositories({ data }: RepositoriesProps) {
  return (
    <div className="bg-[#141b23] shadow-[0_0_0_0.5px_#d1d4d2] rounded-md p-5 border-[#3d444d] w-11/12 min-h-[100px] mb-4">
      <a
        href={data.html_url}
        rel="noopener noreferrer"
        // target="_blank"
        className="text-linkColor font-bold text-sm hover:underline decoration-linkColor"
      >
        {data.name}
      </a>
      <br />
      <p className="text-[#9198a1] text-sm">
        {data.description ? data.description : data.language}
      </p>
    </div>
  );
}
