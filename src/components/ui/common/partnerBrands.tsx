"use client";

import Image from "next/image";

const MarcasParceiras = () => {
  return (
    <>
      <div className="flex-direction:color flex gap-4 p-5">
        <div className="outline-accent flex h-20 w-30 justify-center rounded-xl outline-4">
          <Image
            src="/Adidas-logo.svg"
            alt="adidas"
            width={0}
            height={0}
            sizes="100vw"
            className="h-20 w-20"
          />
          <p> asd</p>
        </div>
        <div className="outline-accent flex h-20 w-30 justify-center rounded-xl outline-4">
          <Image
            src="/zara.png"
            alt="adidas"
            width={0}
            height={0}
            sizes="100vw"
            className="h-20 w-50"
          />
        </div>
        <div className="outline-accent flex h-20 w-30 justify-center rounded-xl outline-4">
          <Image
            src="/zara.png"
            alt="adidas"
            width={0}
            height={0}
            sizes="100vw"
            className="h-20 w-50"
          />
        </div>
      </div>
    </>
  );
};

export default MarcasParceiras;
