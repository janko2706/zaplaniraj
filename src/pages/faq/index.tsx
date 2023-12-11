import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Accordion from "~/Atoms/Accordion/Accordion";
import MainTemplate from "~/Templates/MainTemplate";
import useMenu from "~/hooks/useMenu/useMenu";

const Index = () => {
  const { menus, userCompany } = useMenu();
  return (
    <MainTemplate userCompany={userCompany} menus={menus}>
      <FAQ />
    </MainTemplate>
  );
};

export default Index;

const FAQ = () => {
  const questionsFirstRow = [
    { question: "Kako se registrirati na platformi?", answer: "fsdf" },
    {
      question: "Koje vrste događaja mogu planirati putem vaše platforme?",
      answer: "fsdf",
    },
    {
      question:
        "Koliko košta registracija za pružatelje usluga, i koje su prednosti registracije?",
      answer: "fsdf",
    },
  ];
  const questionsSecondRow = [
    { question: "Kako mogu platiti za usluge na platformi?", answer: "fsdf" },
    {
      question:
        "Kako se osigurava sigurnost i povjerljivost informacija na platformi?",
      answer: "fsdf",
    },
    {
      question:
        "Koje vrste podrške nudite ako imam tehničke probleme ili pitanja?",
      answer: "fsdf",
    },
  ];
  const questionsFirstRowUser = [
    {
      question: "Kako mogu ocijeniti i recenzirati pružatelje usluga?",
      answer: "fsdf",
    },
    {
      question:
        "Mogu li postavljati pitanja prije nego što se odlučim za njih?",
      answer: "fsdf",
    },
    {
      question:
        "Imate li savjete za pravilan odabir pružatelja usluga na platformi?",
      answer: "fsdf",
    },
  ];
  const questionsSecondRowUser = [
    {
      question: "Kako mogu podnijeti prigovor ili dojaviti problem s uslugom?",
      answer: "fsdf",
    },
    {
      question: "Što ako imam posebne zahtjeve ili potrebe za moj događaj?",
      answer: "fsdf",
    },
  ];
  return (
    <section className="relative z-20 overflow-hidden   bg-white pb-12 pt-20 lg:h-screen lg:pb-[90px] lg:pt-[50px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[30px] max-w-[520px] text-center lg:mb-10">
              <span className="mb-2 block text-3xl font-semibold text-primary">
                Najcesce postavljena pitanja
              </span>
              <p className="mb-4 mt-10 text-2xl font-bold text-dark underline">
                Za poslovanja...
              </p>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            {questionsFirstRow.map((item, idx) => {
              return (
                <Accordion
                  key={idx}
                  buttonContent={(open) => (
                    <div className="flex items-center justify-start gap-4 rounded-2xl">
                      <ChevronDownIcon
                        className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                      <p className="text-lg font-bold">{item.question} </p>
                    </div>
                  )}
                  initialOpen={false}
                >
                  <p className="rounded-lg bg-slate-100 px-4 py-3 text-base leading-relaxed">
                    {item.answer}
                  </p>
                </Accordion>
              );
            })}
          </div>
          <div className="w-full px-4 lg:w-1/2">
            {questionsSecondRow.map((item, idx) => {
              return (
                <Accordion
                  key={idx}
                  buttonContent={(open) => (
                    <div className="flex items-center justify-start gap-4 rounded-2xl">
                      <ChevronDownIcon
                        className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                      <p className="text-lg font-bold">{item.question} </p>
                    </div>
                  )}
                  initialOpen={false}
                >
                  <p className="rounded-lg bg-slate-100 px-4 py-3 text-base leading-relaxed">
                    {item.answer}
                  </p>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-20">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[30px] max-w-[520px] text-center lg:mb-10">
              <h2 className="mb-4 text-2xl font-bold text-dark  underline">
                Za korisnike...
              </h2>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            {questionsFirstRowUser.map((item, idx) => {
              return (
                <Accordion
                  key={idx}
                  buttonContent={(open) => (
                    <div className="flex items-center justify-start gap-4 rounded-2xl">
                      <ChevronDownIcon
                        className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                      <p className="text-lg font-bold">{item.question} </p>
                    </div>
                  )}
                  initialOpen={false}
                >
                  <p className="rounded-lg bg-slate-100 px-4 py-3 text-base leading-relaxed">
                    {item.answer}
                  </p>
                </Accordion>
              );
            })}
          </div>
          <div className="w-full px-4 lg:w-1/2">
            {questionsSecondRowUser.map((item, idx) => {
              return (
                <Accordion
                  key={idx}
                  buttonContent={(open) => (
                    <div className="flex items-center justify-start gap-4 rounded-2xl">
                      <ChevronDownIcon
                        className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                      <p className="text-lg font-bold">{item.question} </p>
                    </div>
                  )}
                  initialOpen={false}
                >
                  <p className="rounded-lg bg-slate-100 px-4 py-3 text-base leading-relaxed">
                    {item.answer}
                  </p>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
