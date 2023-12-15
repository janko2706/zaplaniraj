import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-slate-200 pt-6 text-center text-neutral-600  lg:text-left">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              ZAplaniraj
            </h6>
            <p>
              Dobrodošli na našu platformu gdje stvaranje nezaboravnog događanja
              postaje jednostavno i kreativno iskustvo. Bez obzira trebate li
              organizirati rođendansku zabavu, timsku izgradnju ili poseban
              događaj, naša intuitivna platforma omogućuje vam da lako
              pretvorite svoje ideje u stvarnost.
            </p>
          </div>
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Istrazi
            </h6>
            <p className="mb-4">
              <Link href="/discover/wedding" className="text-neutral-600 ">
                Vjenjcanja
              </Link>
            </p>
            <p className="mb-4">
              <Link href="/discover/birthday" className="text-neutral-600 ">
                Rodendani
              </Link>
            </p>
            <p className="mb-4">
              <Link href="/discover/sacrament" className="text-neutral-600 ">
                Sakramenti
              </Link>
            </p>
            <p>
              <Link href="/discover/celebration" className="text-neutral-600 ">
                Slavlja
              </Link>
            </p>
          </div>
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Korisni linkovi
            </h6>
            <p className="mb-4 flex flex-col gap-2">
              <Link href="/faq" className="text-neutral-600 ">
                Najcesca pitanja
              </Link>
              <Link href="/pricing" className="text-neutral-600 ">
                Cjenik
              </Link>
            </p>
          </div>
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Kontakt
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              info@just-pine.com
            </p>
            <a
              href="tel:+385 99-216-6806"
              className="mb-4 flex items-center justify-center md:justify-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              +385 99-216-6806
            </a>
          </div>
        </div>
      </div>

      <div className="0 bg-primaryBlue p-6 text-center text-white">
        <span> 2023 Developed by: </span>
        <a
          className="font-bold text-slate-400 "
          target="_blank"
          href="https://just-pine.hr/"
        >
          JUST-<span className="text-green-600">PINE</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
