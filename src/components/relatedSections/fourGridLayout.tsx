import { Image } from "@yext/pages-components";
import { ComplexImage } from "@yext/types";

interface InsuranceProvider {
  insuranceName: string;
  insurancePhoto?: ComplexImage;
}

interface InsuranceListProps {
  c_insuranceProviders: InsuranceProvider[];
  title: string;
  titleAlignment?: "center" | "left";
}

const InsuranceGrid = ({
  c_insuranceProviders,
  title,
  titleAlignment = "left",
}: InsuranceListProps) => {
  return (
    <section className="centered-container">
      <h2
        className={`text-2xl md:text-4xl font-bold ${
          titleAlignment === "center" ? "text-center" : ""
        }`}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mt-8">
        {c_insuranceProviders.map((provider, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center border bg-primary p-4 rounded-lg"
          >
            {provider.insurancePhoto && (
              <Image
                image={provider.insurancePhoto}
                className="w-24 h-24 object-contain mb-4"
              />
            )}
            <p className="text-lg font-medium">{provider.insuranceName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InsuranceGrid;
