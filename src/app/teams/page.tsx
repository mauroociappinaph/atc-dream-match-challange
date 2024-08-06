import PlayerList from "@/components/player-list";
import TeamForm from "@/components/teamform";
import TeamList from "@/components/team-list";
import Nav from "@/components/nav";
import React from "react";

export default function Create() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <section className="w-full bg-white m-2 ">
        <h2 className="text-2xl font-bold mb-4 text-center">Crea tu equipo</h2>
        <TeamForm />
      </section>
      <main className="flex flex-col w-full max-w-7xl mx-auto items-center p-4 space-y-8">
        <section className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Elegí tus jugadores
          </h2>
          <PlayerList />
        </section>
        <section className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Equipos Creados
          </h2>
          <TeamList />
        </section>
      </main>
      <footer className="w-full bg-white shadow-md py-4 text-center">
        <p className="text-gray-600">
          © 2024 Dream Match. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
