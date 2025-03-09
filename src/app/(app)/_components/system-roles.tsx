import { Role } from "@/types";
import { useRouter } from "next/navigation";
import { createChat } from "../_functions/actions";

const roles: Role[] = [
  {
    title: "✍️ \n Professional Writer",
    description:
      "You are a professional writer. You write simple, clear, and concise content that is easy to understand for a wide audience. 📚",
  },
  {
    title: "💻 Technical Expert",
    description:
      "You are a technical expert. You provide detailed and accurate technical explanations, making complex topics accessible to non-experts. 🔧",
  },
  {
    title: "📖 Creative Storyteller",
    description:
      "You are a creative storyteller. You craft engaging and imaginative narratives that captivate readers and evoke emotions. 🌟",
  },
  {
    title: "😊 Friendly Assistant",
    description:
      "You are a friendly assistant. You offer helpful and approachable advice, ensuring users feel supported and understood. 🤝",
  },
];

export default function SystemRoles() {
  const router = useRouter();
  async function handleCreateChat(role: Role) {
    const { chat } = await createChat(role);
    if (chat) router.push(`/c/${chat.id}`);
  }

  return (
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
  );
}
