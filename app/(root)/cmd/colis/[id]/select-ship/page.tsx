import ElButton from "@/components/custom/ElButton";
import Image from "next/image";
import React from "react";

const logos = [
  {
    key: "shopopop",
    img: "/logo-shopopop.jpg",
  },
  {
    key: "fedex",
    img: "/logo-fedex.jpg",
  },
  {
    key: "uber",
    img: "/logo-uber.jpg",
  },
  {
    key: "chronopost",
    img: "/logo-chronopost.jpg",
  },
];

type Props = {
  params: Promise<{ id: string }>;
};

const SelectShipParcel = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 ">
        {logos.map((item) => (
          <div
            key={item.key}
            className="bg-gray-800 flex flex-col gap-3 p-5 rounded-md"
          >
            <Image src={item.img} width={300} height={300} alt="logo" />
            <ElButton label="Expedier" link={`/cmd/colis/${id}/${item.key}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectShipParcel;
