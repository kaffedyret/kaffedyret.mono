import Link from "next/link";
import { BiEnvelope } from "react-icons/bi";
import { FaFacebook, FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { Maskot } from "../Maskot";

export function Footer() {
  return (
    <footer>
      <div className="bg-neutral-900 text-white py-12">
        <div className="container-narrow py-2 prose prose-invert prose-sm">
          <section className="grid grid-cols-1 md:grid-cols-4 gap-8 place-items-center text-center md:text-left">
            <div className="md:p-12 h-24 md:h-80">
              <Maskot />
            </div>

            <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4>Sosiale medier</h4>

                <div className="flex items-center justify-center md:justify-start gap-2">
                  <a
                    href="https://www.instagram.com/kaffedyret_brenneri"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <FaInstagram fontSize={20} />
                  </a>
                  <a
                    href="https://www.facebook.com/Kaffedyret"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <FaFacebookSquare fontSize={20} />
                  </a>
                </div>
              </div>

              <div>
                <h4>Kaffedyret</h4>

                <div className="flex flex-col">
                  <Link href="/om-oss">
                    <a>Om oss</a>
                  </Link>
                </div>
              </div>

              <div>
                <h4>Kontakt oss</h4>

                <div className="not-prose">
                  <p>Gunnlafjellet 11A</p>
                  <p>5302 Strusshamn</p>
                  <a
                    className="prose prose-invert prose-sm"
                    href="mailto:hei@kaffedyret.no"
                  >
                    hei@kaffedyret.no
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-black text-white py-1">
        <div className="container py-2">
          <p className="text-xs text-center">Kaffedyret 2022&trade;</p>
        </div>
      </div>
    </footer>
  );
}
