"use client";
import useSWR, { Fetcher } from "swr";
import { FormEvent, use, useRef, useState } from "react";
import Image from "next/image";
import { FaBeer } from "react-icons/fa";
import CardRepositories from "@/components/CardRepositories";
import { log } from "console";

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
  avatar_url: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Repositories({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const userRef = useRef<HTMLInputElement>(null);

  const { userName } = use(params);

  const [user, setUser] = useState(userName);

  const { data, error, isLoading } = useSWR<RepositoriesProps[]>(
    `https://api.github.com/users/${user}/repos`,
    fetcher
  );

  if (error) return <div>falhou ao carregar</div>;
  if (isLoading) return <div>carregando...</div>;
  if (!data) return <div>Não existe nenhum repositório</div>;

  function handleSubmitForm(event: FormEvent) {
    event?.preventDefault();
    if (!userRef.current?.value) {
      alert("Preencha todos os campos!!!");
      return;
    }
    setUser(userRef.current.value);

    userRef.current.value = "";
  }

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className="flex mt-[90px] w-full justify-around"
      >
        <input
          type="text"
          placeholder="Informe um novo usuário"
          ref={userRef}
          className="font-normal text-base rounded-md w-9/12 p-2 mb-6 sm:w-8/12 placeholder-zinc-900 text-zinc-900"
        />
        <input
          type="submit"
          value="Buscar"
          className="w-2/12 sm:w-3/12 mb-6 p-2 bg-buttonColor cursor-pointer hover:bg-buttonColorHover  rounded-md font-bold text-base duration-300"
        />
      </form>
      <div className="w-screen flex items-center ml-5 my-5">
        <Image
          src={`https://github.com/${user}.png`}
          alt={user}
          className="rounded-full"
          width={50}
          height={50}
        />
        <p className="text-lg font-bold ml-4">{user}</p>
      </div>
      <section>
        <h1 className="text-lg font-bold ml-5 mb-5">Repositorios</h1>
        <div
          id="ListRepositories"
          className="flex flex-wrap w-screen justify-center"
        >
          {data.map((item: RepositoriesProps) => {
            return <CardRepositories key={item.id} data={item} />;
          })}
        </div>
      </section>
    </>
  );
}
