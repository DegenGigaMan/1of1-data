import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="w-full h-full p-10 flex justify-between items-center">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://particlesnft.io/"
        className="flex justify-between items-center gap-5 text-3xl"
      >
        <Image width={36} height={41} src="/images/plogo.png" alt="logo" />
        Particles
      </a>
      <ul className="flex justify-between items-center gap-7">
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://groovyenzio.medium.com/particles-nft-8cdbc50e884"
          >
            <Image
              width={22}
              height={22}
              src="/images/download.png"
              alt="medium"
            />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://dsc.gg/particles"
          >
            <Image
              width={24}
              height={24}
              src="/images/discord.svg"
              alt="discord"
            />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/particlesnft"
          >
            <Image
              width={28}
              height={28}
              src="/images/twitter.svg"
              alt="twitter"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
