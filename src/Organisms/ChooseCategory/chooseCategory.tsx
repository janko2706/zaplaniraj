import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import type { SingleValue } from "react-select";
import Select from "react-select";
import SmallModal from "~/Atoms/SmallModal/SmallModal";
import { api } from "~/utils/api";
import { getCategoryTranslation } from "~/utils/translationHelpers";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export default function ChooseCategory() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const router = useRouter();
  const { mutateAsync: setOnboarding } = api.user.setOnboarding.useMutation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();
  const [businessName, setBusinessName] = useState<string | undefined>();
  const [categories, setCategories] = useState<
    | {
        id: number;
        value: string;
        label: string;
      }[]
    | undefined
  >(undefined);
  const [selectedItem, setSelectedItem] = useState<
    | SingleValue<{
        value: string;
        label: string;
      }>
    | undefined
  >(undefined);

  const getAll = api.businessCategoryType.getAll.useQuery();

  useEffect(() => {
    setCategories(
      getAll.data?.map((item) => {
        return {
          value: getCategoryTranslation(item.value),
          label: getCategoryTranslation(item.label),
          id: item.id,
        };
      })
    );
  }, [getAll.data]);
  const termsText =
    "1. Uvod Ovi opći uvjeti korištenja (u daljnjem tekstu: Uvjeti) reguliraju korištenje platforme za planiranje događaja (u daljnjem tekstu: Platforma) koju pruža [naziv tvrtke]. 2. Definicije U ovim Uvjetima, osim ako iz konteksta proizlazi drugačije, sljedeći pojmovi imaju sljedeće značenje: Korisnik je svaka osoba koja koristi Platformu, bez obzira na to je li registriran ili ne. Registrirani korisnik je korisnik koji je kreirao korisnički račun na Platformi. Događaj je bilo koji događaj koji korisnik planira putem Platforme, poput vjenčanja, rođendana, krizme, itd. 3. Pristup i korištenje Platforme Pristup Platformi je besplatan. Međutim, neki dijelovi Platforme mogu biti dostupni samo registriranim korisnicima. Registracija na Platformu je jednostavna i besplatna. Korisnik mora unijeti svoje osobne podatke, kao što su ime, prezime, e-mail adresa i lozinka. Korisnik je odgovoran za održavanje tajnosti svoje lozinke. Korisnik je također odgovoran za sve aktivnosti koje se obavljaju putem njegovog korisničkog računa. 4. Prava i obveze korisnika Korisnik se obvezuje koristiti Platformu u skladu s ovim Uvjetima. Korisnik ima pravo: koristiti Platformu za planiranje događaja pristupati i pregledavati sadržaj Platforme ostavljati komentare na sadržaj Platforme Korisnik je dužan: koristiti Platformu na način koji ne krši prava trećih osoba ne objavljivati sadržaj koji je uvredljiv, diskriminirajući ili na bilo koji drugi način štetan ne objavljivati sadržaj koji je zaštićen autorskim pravima ili drugim pravima intelektualnog vlasništva ne objavljivati sadržaj koji je lažan ili obmanjujući 5. Prava i obveze [naziv tvrtke] [Naziv tvrtke] ima pravo: mijenjati sadržaj Platforme blokirati korisnike koji krše ove Uvjete obrisati sadržaj koji je uvredljiv, diskriminirajući ili na bilo koji drugi način štetan obrisati sadržaj koji je zaštićen autorskim pravima ili drugim pravima intelektualnog vlasništva obrisati sadržaj koji je lažan ili obmanjujući [Naziv tvrtke] nije odgovoran za bilo kakvu štetu koja može nastati korisniku ili trećim osobama korištenjem Platforme. 6. Završne odredbe Ovi Uvjeti su na snazi od datuma njihove objave. [Naziv tvrtke] zadržava pravo mijenjati ove Uvjete u bilo kojem trenutku. Korisnici su dužni redovito pregledavati ove Uvjete kako bi bili upoznati s eventualnim izmjenama. U slučaju bilo kakvih sporova između [naziv tvrtke] i korisnika primjenjuje se hrvatsko pravo. 7. Kontakt Za sve dodatne informacije ili upite, korisnici se mogu obratiti [naziv tvrtke] na adresu [e-mail adresa] ili [telefonski broj].";
  return (
    <motion.div
      className="z-10 mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        show: {
          opacity: 1,
          scale: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ duration: 0.3, type: "spring" }}
    >
      <motion.div
        variants={STAGGER_CHILD_VARIANTS}
        className="flex flex-col items-center space-y-10 text-center"
      >
        <p className="text-2xl font-bold tracking-tighter text-primary">
          Dobrodosli u ZAplaniraj
        </p>
        <h1 className="font-display max-w-md text-3xl font-semibold text-gray-700 transition-colors sm:text-4xl">
          Detalji o Vasem poslovanju
        </h1>
      </motion.div>
      <motion.div variants={STAGGER_CHILD_VARIANTS} className="w-full">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-600 "
          >
            Ime Poslovanja &#42;
          </label>
          <input
            type="text"
            id="name"
            onChange={(input) => setBusinessName(input.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900"
            placeholder="Restoran Moj Grill..."
          />
        </div>
      </motion.div>
      <motion.div variants={STAGGER_CHILD_VARIANTS} className="w-full">
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium text-gray-600 "
        >
          Kategorija Vaseg Poslovanja &#42;
        </label>
        <Select
          id="category"
          options={categories}
          className="w-full"
          placeholder="odaberi..."
          onChange={(value) => {
            setSelectedItem(value);
            if (value) {
              setSelectedCategoryId(value.id);
            }
          }}
        />

        <div className="mt-4 flex items-center">
          <input
            id="termsAccepted-checkbox"
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className=" peer h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
          />
          <label
            htmlFor="termsAccepted-checkbox"
            className="ms-2 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-900 peer-checked:line-through"
            onClick={() => setTermsModalOpen(true)}
          >
            Opci uvjeti koristenja
          </label>
          <SmallModal
            // eslint-disable-next-line @typescript-eslint/require-await
            onConfirm={async () => setTermsModalOpen(false)}
            title={"Opci Uvjeti Koristenja"}
            subText={termsText}
            terms
            confirmButtonText={"Zatvori"}
            open={termsModalOpen}
            setOpen={setTermsModalOpen}
          />
        </div>
        <button
          type="button"
          disabled={
            selectedItem === undefined ||
            businessName === undefined ||
            businessName === "" ||
            !termsAccepted
          }
          className="mx-auto  mt-5 flex  items-center justify-center overflow-hidden rounded-2xl border p-2 transition-colors hover:bg-blue-500 hover:text-white disabled:opacity-30 disabled:hover:cursor-not-allowed"
          onClick={() => {
            void (async () => {
              if (selectedCategoryId && businessName) {
                await setOnboarding({
                  businessName: businessName,
                  typeOfBusinessId: selectedCategoryId,
                  onboardingLevel: "businessDetails",
                });

                await router.push("/onboarding/company/payment", undefined, {
                  locale: router.locale,
                });
              }
            })();
          }}
        >
          <p>Dalje</p>
          <ArrowRightIcon className="pointer-events-none ml-3  h-5 w-5 " />
        </button>
      </motion.div>
    </motion.div>
  );
}
