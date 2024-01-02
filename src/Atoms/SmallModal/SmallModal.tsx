import { Fragment, type SetStateAction, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  onConfirm: () => Promise<void>;
  title: string;
  subText: string;
  confirmButtonText: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  terms?: boolean;
};

export default function SmallModal({
  onConfirm,
  open,
  setOpen,
  title,
  subText,
  terms,
  confirmButtonText,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  items-center justify-center  p-0 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg  bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        {!terms ? (
                          <p className=" text-sm text-gray-500">{subText}</p>
                        ) : (
                          <p className=" text-sm text-gray-500">
                            1. Uvod <br /> Ovi opći uvjeti korištenja (u
                            daljnjem tekstu: Uvjeti) reguliraju korištenje
                            platforme Zaplaniraj (u daljnjem tekstu: Platforma)
                            koju pruža JUST PINE. <br /> 2. Definicije
                            <br /> U ovim Uvjetima, osim ako iz konteksta
                            proizlazi drugačije, sljedeći pojmovi imaju sljedeće
                            značenje:
                            <br /> &bull; &quot;Korisnik&quot; je svaka osoba
                            koja koristi Platformu, bez obzira na to je li
                            registriran ili ne.
                            <br /> &bull; &quot;Registrirani korisnik&quot; je
                            korisnik koji je kreirao korisnički račun na
                            Platformi. <br /> &bull; &quot;Događaj&quot; je bilo
                            koji događaj koji korisnik planira putem Platforme,
                            poput vjenčanja, rođendana, krizme, itd. <br />
                            3. Pristup i korištenje Platforme <br />
                            Pristup Platformi je besplatan. Međutim, neki
                            dijelovi Platforme mogu biti dostupni samo
                            registriranim korisnicima. <br />
                            Registracija na Platformu je jednostavna i
                            besplatna. Korisnik mora unijeti svoje osobne
                            podatke, kao što su e-mail adresa i lozinka. <br />
                            Korisnik je odgovoran za održavanje tajnosti svoje
                            lozinke. Korisnik je također odgovoran za sve
                            aktivnosti koje se obavljaju putem njegovog
                            korisničkog računa.
                            <br /> 4. Prava i obveze korisnika <br />
                            Korisnik se obvezuje koristiti Platformu u skladu s
                            ovim Uvjetima. <br />
                            Korisnik ima pravo: <br /> &bull; koristiti
                            Platformu za planiranje događaja
                            <br /> &bull; pristupati i pregledavati sadržaj
                            Platforme <br /> ostavljati komentare na sadržaj
                            Platforme <br /> Korisnik je dužan: <br /> &bull;
                            koristiti Platformu na način koji ne krši prava
                            trećih osoba ne objavljivati sadržaj koji je
                            uvredljiv, diskriminirajući ili na bilo koji drugi
                            način štetan <br /> &bull; ne objavljivati sadržaj
                            koji je zaštićen autorskim pravima ili drugim
                            pravima intelektualnog vlasništva <br /> &bull; ne
                            objavljivati sadržaj koji je lažan ili obmanjujući
                            <br /> 5. Prava i obveze JUST PINE-a <br />
                            JUST PINE ima pravo: <br /> &bull; mijenjati sadržaj
                            Platforme <br /> &bull; blokirati korisnike koji
                            krše ove Uvjete <br /> &bull; obrisati sadržaj koji
                            je uvredljiv, diskriminirajući ili na bilo koji
                            drugi način štetan <br /> &bull; obrisati sadržaj
                            koji je zaštićen autorskim pravima ili drugim
                            pravima intelektualnog vlasništva <br /> &bull;
                            obrisati sadržaj koji je lažan ili obmanjujući{" "}
                            <br />
                            JUST PINE nije odgovoran za bilo kakvu štetu koja
                            može nastati korisniku ili trećim osobama
                            korištenjem Platforme. <br />
                            6. Završne odredbe <br />
                            Ovi Uvjeti su na snazi od datuma njihove objave.
                            JUST PINE zadržava pravo mijenjati ove Uvjete u bilo
                            kojem trenutku. <br />
                            Korisnici su dužni redovito pregledavati ove Uvjete
                            kako bi bili upoznati s eventualnim izmjenama.
                            <br /> U slučaju bilo kakvih sporova između JUST
                            PINE i korisnika primjenjuje se hrvatsko pravo.
                            <br /> 7. Kontakt
                            <br /> Za sve dodatne informacije ili upite,
                            korisnici se mogu obratiti JUST PINE na adresu
                            bogovicjan@gmail.com/info@just-pine.hr.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={async () => {
                      await onConfirm();
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    {confirmButtonText}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    nazad
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
