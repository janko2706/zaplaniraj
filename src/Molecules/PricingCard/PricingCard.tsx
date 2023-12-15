import { motion } from "framer-motion";

type PricingCardProps = {
  name: string;
  price: string;
  features: string[];
  onClick: () => Promise<void> | void;
  buttonText: string;
};
const STAGGER_CHILD_VARIANTS = {
  hidden: { y: 100 },
  show: { y: 0, transition: { duration: 0.4, type: "spring" } },
};
const PricingCard = ({
  name,
  price,
  features,
  onClick,
  buttonText,
}: PricingCardProps) => {
  return (
    <motion.div
      variants={STAGGER_CHILD_VARIANTS}
      className="rounded-lg border border-t-8 border-slate-400 bg-slate-200 bg-opacity-0 p-5 shadow transition-all duration-200 ease-in-out hover:bg-opacity-70 "
    >
      <p className=" text-3xl font-semibold uppercase text-black">{name}</p>

      <p className="mt-4 text-2xl  font-medium text-gray-600">{price}</p>

      <div className="mt-8">
        <ul className="grid grid-cols-1 gap-4">
          {features.map((item, key) => {
            return (
              <li key={key} className="inline-flex items-center text-gray-600">
                <svg
                  className="mr-2 h-4 w-4 fill-current text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                </svg>
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8">
        <button
          className="w-full rounded-lg bg-gray-400 px-3 py-2 text-white transition-all duration-300 ease-in-out hover:bg-blue-500"
          onClick={() => {
            void (async () => await onClick())();
          }}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
