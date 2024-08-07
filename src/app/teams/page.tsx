import PlayerList from "@/components/player-list";
import TeamForm from "@/components/teamform";
import TeamList from "@/components/team-list";
import Nav from "@/components/nav";
import React from "react";

export default function Create() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <section className="bg-white mt-4 ">
        <h2>Crea tu equipo</h2>
        <TeamForm />
      </section>
      <main className="flex flex-col w-full max-w-7xl mx-auto items-center p-4 space-y-8">
        <section className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2>Elegí tus jugadores</h2>
          <PlayerList />
        </section>
        <section className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2>Equipos Creados</h2>
          <TeamList />
        </section>
      </main>
      <footer className="w-full bg-customRed shadow-md py-4 text-center">
        <h6 className="text-white">
          © 2024 Dream Match. All rights reserved.
        </h6>
      </footer>
    </div>
  );
}
