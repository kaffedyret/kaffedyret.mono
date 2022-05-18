import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import logo from "~/assets/images/kaffedyret_icon_rounded.svg";

export function Footer() {
  return (
    <footer>
      <div className="bg-neutral-900 text-white py-12">
        <div className="container-extra-narrow py-2 prose prose-invert prose-sm">
          <section className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <Image
                className="w-12 h-12"
                src={logo}
                alt="Kaffedyret logo"
                title="Kaffedyret"
                width={48}
                height={48}
              />
            </div>

            <div>
              <h4 className="mt-0">Sosiale medier</h4>

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
              <h4 className="mt-0">Kaffedyret</h4>

              <div className="flex flex-col">
                <Link href="/om-oss">
                  <a>Om oss</a>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="mt-0">Kontakt oss</h4>

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
          </section>
        </div>
      </div>

      <div className="bg-black text-white py-1">
        <div className="container py-2">
          <p className="text-xs text-center">&copy;2022 Kaffedyret&reg;</p>
        </div>
      </div>
    </footer>
  );
}
