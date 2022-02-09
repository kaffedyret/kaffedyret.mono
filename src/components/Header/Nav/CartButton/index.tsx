import Link from "next/link";
import { BiCart } from "react-icons/bi";

interface Props {
  isNotEmpty?: boolean;
}

export function CartButton(props: Props) {
  return (
    <Link href="/handlevogn">
      <a className="h-full border-b-2 border-transparent md:hover:border-blue-500">
        <div className="relative flex justify-center items-center text-2xl w-12 h-full">
          <BiCart />

          {props.isNotEmpty && (
            <span className="bg-blue-500 w-2 h-2 absolute -mt-4 -mr-6 rounded-full" />
          )}
        </div>
      </a>
    </Link>
  );
}
