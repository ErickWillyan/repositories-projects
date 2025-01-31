"use client";

import { useRef, FormEvent } from "react";

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

    alert(userRef?.current?.value);

    userRef.current.value = "";
  }

  return (
    <>
      <div>
        <h1>Busque os repositórios do usuário que desejar!</h1>
      </div>
      <form onSubmit={searchRepositories}>
        <label>Insira o usuário:</label>
        <input type="text" className="" ref={userRef} />
        <input type="submit" value="Buscar" />
      </form>
    </>
  );
}
