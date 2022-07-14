import Image from "next/image";
import logo from "~/assets/images/kaffedyret_icon_rounded.svg";

type Props = {
  label?: string;
};

const Loading = ({ label }: Props): JSX.Element => (
  <div className="flex flex-col justify-center items-center gap-6">
    <span className="animate-spin-slow">
      <Image
        className="w-12 h-12"
        src={logo}
        alt="Kaffedyret logo"
        title="Kaffedyret"
        width={48}
        height={48}
      />
    </span>

    {label && <span className="">{label}</span>}
  </div>
);

export default Loading;
