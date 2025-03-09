import Image from "next/image";
import SystemRoles from "./_components/system-roles";

function Home() {
  return (
    <>
      <div className="flex-1 flex flex-col justify-center align-center">
        <Image
          src="/OpenAI-logo.svg"
          alt="OpenAI"
          width={84}
          height={84}
          className="mb-15 mx-auto"
        />

        <SystemRoles />
      </div>
    </>
  );
}

export default Home;
