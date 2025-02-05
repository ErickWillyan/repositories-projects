"use client";

import { useRef, FormEvent } from "react";
import { redirect } from "next/navigation";

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
      <main className="h-screen sm:w-screen justify-center flex items-center p-8">
        <div className="mb-60">
          <h1 className=" text-2xl sm:text-4xl font-bold mb-10 select-none">
            Busque os repositórios do usuário que desejar!
          </h1>
          <form
            onSubmit={searchRepositories}
            className="flex flex-wrap justify-around"
          >
            <label className="text-lg font-semibold w-full mb-3 sm:pl-5 select-none">
              Usuário:
            </label>
            <input
              name="userNameInput"
              type="text"
              className="font-normal text-base rounded-md w-full p-2 mb-6 sm:w-8/12 placeholder-zinc-900 text-zinc-900"
              placeholder="Insira o usuário"
              ref={userRef}
            />
            <input
              type="submit"
              value="Buscar"
              className="w-full sm:w-3/12 mb-6 p-2 bg-buttonColor cursor-pointer hover:bg-buttonColorHover  rounded-md font-bold text-base duration-300"
            />
          </form>
        </div>
      </main>
    </>
  );
}
