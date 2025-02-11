"use client";
import { User, RepositoriesUser } from "@/utils/fetcher";
import { redirect } from "next/navigation";
import { FormEvent, use, useRef } from "react";
import Image from "next/image";
import CardRepositories from "@/components/CardRepositories";

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

interface UserProps {
  login: string;
  id: number;
  name: string;
  avatar_url: string;
}

export default function Repositories({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = use(params);

  const userRef = useRef<HTMLInputElement>(null);

  const userResponse = User(userName);
  const repositoriesResponse = RepositoriesUser(userName);

  if (userResponse.isLoading) return <div>Carregando...</div>;

  if (repositoriesResponse.isLoading) return <div>Carregando...</div>;

  let userData: UserProps = userResponse.user;

  let repositoriesData: RepositoriesProps[] = repositoriesResponse.user;

  function handleSubmitForm(event: FormEvent) {
    event?.preventDefault();
    if (!userRef.current?.value) {
      alert("Preencha todos os campos!!!");
      return;
    }
    redirect(`/repositories/${userRef.current.value}`);
  }

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className="sm:w-1/2 sm:justify-between flex mt-[90px] mx-auto w-full justify-around"
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
      <div className="sm:w-1/2 w-screen flex sm:mx-auto items-center ml-5 my-5">
        {window.screen.width <= 640 ? (
          <Image
            src={`https://github.com/${userData.login}.png`}
            alt={userData.name}
            className="rounded-full"
            width={50}
            height={50}
          />
        ) : (
          <Image
            src={`https://github.com/${userData.login}.png`}
            alt={userData.name}
            className="rounded-full"
            width={60}
            height={60}
          />
        )}

        <p className="sm:text-xl text-lg font-bold ml-4">{userData.name}</p>
      </div>
      <section className="sm:w-1/2 mx-auto ">
        <h1 className="sm:text-xl text-lg font-bold ml-5 mb-5">Repositorios</h1>
        <div
          id="ListRepositories"
          className="sm:grid sm:grid-cols-[1fr_1fr] sm:justify-items-center sm:w-full  flex flex-wrap w-screen justify-center"
        >
          {repositoriesData.map((item: RepositoriesProps) => {
            return <CardRepositories key={item.id} data={item} />;
          })}
        </div>
      </section>
    </>
  );
}
