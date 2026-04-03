import Link from "next/link";
import { FaCheckDouble } from "react-icons/fa6";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export function AppLogo({className}: {className?: string}) {
  return (
    <div className={`flex gap-2 items-center mb-[10px] justify-center ${className}`}>
      <Link href='/to-dos'>
      <div className="bg-primary p-2 text-white rounded-sm text-lg hidden">
        <FaCheckDouble />
      </div>

      <div className="font-bold  text-2xl flex gap-1 justify-center items-center">
        <span className="text-primary">Todo</span>
        <span>App</span>
      </div>
      </Link>
    </div>
  );
}

//
