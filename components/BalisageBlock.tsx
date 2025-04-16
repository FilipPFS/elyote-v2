import React from "react";
import HomeBlock from "./HomeBlock";
import { CarouselSize } from "./CarouselBalisage";
import { useTranslations } from "next-intl";

const BalisageBlock = () => {
  const t = useTranslations("global.markup");
  return <HomeBlock title={t("title")} jsx={<CarouselSize />} />;
};

export default BalisageBlock;
