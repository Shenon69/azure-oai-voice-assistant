import Image from "next/image";
import { SettingsIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="">

      {/* Header */}
      <header className="flex justify-between fixed top-0 text-white w-full p-5">
        <Image
          src={'https://picsum.photos/200'}
          height={50}
          width={50}
          alt="Picture of the author"
        />

        <SettingsIcon
          size={40}
          className="p-2 m-2 rounded-full cursor-pointer bg-purple-600 text-black transition-all ease-in-out duration-150 hover:bg-purple-700 hover:text-white"
        />
      </header>

      {/* Form */}
      <form>
        <div></div>
      </form>

    </main>
  );
}
