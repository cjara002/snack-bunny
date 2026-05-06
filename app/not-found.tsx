import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#fff9f5] to-[#ffe8dc] flex flex-col items-center justify-center px-8 text-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/404.png"
        alt="A very chonky SnackBunny looking guilty"
        width={220}
        height={230}
        className="w-52 animate-bunny-float"
        draggable={false}
      />

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#E07A5F]">
          Error 404
        </p>
        <h1 className="font-black text-4xl text-[#4A3728] tracking-tight leading-tight">
          This page got snacked.
        </h1>
        <p className="text-[#A08070] font-medium text-base max-w-64 mx-auto">
          Bunny ate it. We&apos;re not proud.
        </p>
      </div>

      <Link
        href="/home"
        className="mt-2 bg-[#E07A5F] text-white font-extrabold text-base px-8 py-3.5 rounded-4xl shadow-[0_6px_16px_rgba(224,122,95,0.35)] hover:bg-[#B85A3F] active:scale-95 transition-all"
      >
        Go back home
      </Link>
    </div>
  );
}
