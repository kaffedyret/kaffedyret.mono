import Link from "next/link";
import { Button } from "../Button";
import { Kaffedyret } from "../Kaffedyret";
import { Maskot } from "../Maskot";
import { BiRightArrowAlt } from "react-icons/bi";

export function Hero() {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20">
        <div className="inline-flex items-center justify-center md:justify-end h-96 order-2 md:order-1">
          <Maskot />
        </div>

        <div className="order-1 md:order-2 flex flex-col items-center md:items-start">
          <div className="prose prose-2xl text-center md:text-left pb-8">
            <h1 className="font-jumble">Hei!</h1>
            <p className="text-3xl">
              Vi er <Kaffedyret />, et pittelite kaffebrenneri på Askøy.
            </p>
          </div>

          <Link href="/kaffe" passHref>
            <Button
              isLarge
              iconRight={<BiRightArrowAlt className="scale-125" />}
            >
              Se vårt utvalg
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
