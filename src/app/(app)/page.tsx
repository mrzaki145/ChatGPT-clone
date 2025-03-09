"use client";

import { createChat } from "@/app/(app)/_functions/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

// export const dynamic = "force-dynamic";

const roles = [
  {
    title: "✍️ Professional Writer ",
    description:
      "You are a professional writer. You write simple, clear, and concise content that is easy to understand for a wide audience. 📚",
  },
  {
    title: "💻 Technical Expert ",
    description:
      "You are a technical expert. You provide detailed and accurate technical explanations, making complex topics accessible to non-experts. 🔧",
  },
  {
    title: "📖 Creative Storyteller ",
    description:
      "You are a creative storyteller. You craft engaging and imaginative narratives that captivate readers and evoke emotions. 🌟",
  },
  {
    title: "😊 Friendly Assistant ",
    description:
      "You are a friendly assistant. You offer helpful and approachable advice, ensuring users feel supported and understood. 🤝",
  },
  // {
  //   title: "📈 Marketing Specialist ",
  //   description:
  //     "You are a marketing specialist. You create persuasive and compelling marketing content that drives engagement and conversions. 💡",
  // },
];

function Home() {
  const router = useRouter();
  async function handleCreateChat(role: {
    title: string;
    description: string;
  }) {
    const { chat } = await createChat(role);
    if (chat) router.push(`/c/${chat.id}`);
  }

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

        <div className="mx-auto flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
          {roles.map((role) => (
            <button
              type="button"
              key={role.title}
              className="relative flex w-42 flex-col gap-2 rounded-xl border border-white/10 cursor-pointer p-4 pb-5 text-start align-top text-sm shadow-xxs hover:bg-white/5 transition disabled:cursor-not-allowed"
              onClick={() => handleCreateChat(role)}
            >
              <span className="line-clamp-3 max-w-full  text-balance text-white/75 break-word">
                {role.title}
              </span>
              {/* <p className="text-sm text-gray-600">{role.description}</p> */}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
