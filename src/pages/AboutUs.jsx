import { GoogleMap } from "../cmps/GoogleMap";
import { useTranslation } from "react-i18next";

export function AboutUs() {
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t("about.title", "About Us")}</h2>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit.</p>

      <h3>{t("about.branches", "Our Branches")}</h3>

      <GoogleMap />
    </section>
  )
}
