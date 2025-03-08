import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <Image src="/chatgpt-icon.svg" alt="ChatGPT" width={42} height={42} />
        <h2 className="text-2xl font-semibold mb-4 mt-6">404 Not Found</h2>
        <p className="mb-8">
          Lost in the vast web, <br /> Where you sought, there&lsquo;s only
          void_
          <br />
          Nothingness awaits.
        </p>

        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
