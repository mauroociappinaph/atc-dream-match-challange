import Link from "next/link";

export default function welcome() {
  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[url('/placeholder.svg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
      <div className="relative z-20 text-center space-y-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
          Bienvenidos a <br />
          <span className="text-customRed font-bold bolder ">Dream Match</span>
        </h1>
        <Link
          href="/teams"
          className="inline-flex items-center justify-center rounded-md bg-customRed px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
        >
          Empezar
        </Link>
      </div>
    </div>
  );
}
