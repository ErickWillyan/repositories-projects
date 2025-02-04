"use client";

import { useRef, FormEvent } from "react";
import { redirect } from "next/navigation";

interface SearchRepositoriesRequest {
  user: string | null;
}

export default function Home() {
  const userRef = useRef<HTMLInputElement>(null);

  function searchRepositories(event: FormEvent) {
    event?.preventDefault();
    if (!userRef.current?.value) {
      alert("Preencha todos os campos!!!");
      return;
    }

    redirect(`/repositories/${userRef.current.value}`);
  }

  return (
    <>
      <main className="h-screen flex items-center p-8">
        <div className="">
          <h1 className=" text-2xl  font-bold mb-10">
            Busque os repositórios do usuário que desejar!
          </h1>
          <form onSubmit={searchRepositories} className="flex flex-wrap">
            <label className="text-lg font-semibold w-ful mb-3">Usuário:</label>
            <input
              name="userNameInput"
              type="text"
              className="font-normal text-base rounded-md w-full p-2 mb-6"
              placeholder="Insira o usuário"
              ref={userRef}
            />
            <input
              type="submit"
              value="Buscar"
              className="w-full p-2 bg-buttonColor cursor-pointer hover:bg-buttonColorHover  rounded-md font-bold text-base duration-300"
            />
          </form>
        </div>
      </main>
    </>
  );
}
