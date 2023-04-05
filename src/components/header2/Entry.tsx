import { useState } from "react";
import Link from "next/link";
import { animated, useSpring, type SpringValue } from "@react-spring/web";

import UserMenu from "./user/Entry";

// ! td: go gover this and home page responsiveness

const Header = ({
  color = "black",
  isLanding,
}: {
  color?: "black" | "white";
  isLanding?: true;
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [panelSprings, panelSpringApi] = useSpring(() => ({
    config: { tension: 280, friction: 60 },
    from: {
      translateX: "100%",
    },
  }));

  const [logoSprings, logoSpringsApi] = useSpring(() => ({
    config: { tension: 280, friction: 60 },
    from: {
      color: color === "black" ? "black" : "white",
      opacity: isLanding ? 0 : 1,
    },
  }));

  const [userMenuSprings, userMenuSpringsApi] = useSpring(() => ({
    config: { tension: 280, friction: 60 },
    from: {
      opacity: isLanding ? 0 : 1,
      pointerEvents: isLanding ? "none" : "auto",
    },
  }));

  return (
    <>
      <div className="fixed left-0 top-0 z-40 flex w-full items-center justify-between px-4 py-2 xl:px-8 xl:py-6">
        <Logo
          color={color}
          logoSprings={logoSprings}
          disableLink={isLanding && !menuIsOpen}
        />
        <HeaderRightSide
          color={color}
          onClose={() => {
            panelSpringApi.start({
              translateX: "100%",
            });
            logoSpringsApi.start({
              color: color === "black" ? "black" : "white",
              opacity: isLanding ? 0 : 1,
            });
            userMenuSpringsApi.start({
              opacity: isLanding ? 0 : 1,
              pointerEvents: isLanding ? "none" : "auto",
            });
            setMenuIsOpen(false);
          }}
          onOpen={() => {
            panelSpringApi.start({
              translateX: "0%",
            });
            logoSpringsApi.start({
              color: "black",
              opacity: 1,
            });
            userMenuSpringsApi.start({
              opacity: 1,
              pointerEvents: "auto",
            });
            setMenuIsOpen(true);
          }}
          userMenuSprings={userMenuSprings}
        />
      </div>
      <SiteMenuPanel panelSprings={panelSprings} />
    </>
  );
};

export default Header;

const Logo = ({
  color,
  logoSprings,
  disableLink,
}: {
  color: "black" | "white";
  logoSprings: {
    color: SpringValue<string>;
    opacity: SpringValue<number>;
  };
  disableLink?: boolean;
}) => {
  return (
    <Link
      href="/"
      passHref
      className={disableLink ? "pointer-events-none" : "pointer-events-auto"}
    >
      <animated.div
        className={`text-sm uppercase tracking-widest xl:text-base ${
          color === "white" ? "text-white" : "text-black"
        }`}
        style={{ ...logoSprings }}
      >
        <span className="text-lg xl:text-xl">P</span>iros
        <br />
        <span className="text-lg xl:text-xl">P</span>hotography
      </animated.div>
    </Link>
  );
};

const HeaderRightSide = ({
  color,
  onClose,
  onOpen,
  userMenuSprings,
}: {
  color: "black" | "white";
  onOpen: () => void;
  onClose: () => void;
  userMenuSprings: {
    opacity: SpringValue<number>;
  };
}) => {
  return (
    <div className="flex items-center gap-8">
      <animated.div style={{ ...userMenuSprings }}>
        <UserMenu />
      </animated.div>
      <SiteMenuButton color={color} onClose={onClose} onOpen={onOpen} />
    </div>
  );
};

const SiteMenuButton = ({
  color,
  onClose,
  onOpen,
}: {
  color: "black" | "white";
  onOpen: () => void;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [buttonTopBarSprings, buttonTopBarSpringApi] = useSpring(() => ({
    config: { tension: 280, friction: 60 },
    from: {
      rotate: 0,
      translateY: 0,
      backgroundColor: color,
    },
  }));
  const [buttonMidBarSprings, buttonMidBarSpringApi] = useSpring(() => ({
    config: { tension: 280, friction: 60 },
    from: {
      opacity: 1,
    },
  }));
  const [buttonBottomBarSprings, buttonBottomBarSpringApi] = useSpring(() => ({
    config: { tension: 280, friction: 60 },
    from: {
      rotate: 0,
      translateY: 0,
      backgroundColor: color,
    },
  }));

  const openMenu = () => {
    onOpen();

    buttonTopBarSpringApi.start({
      rotate: 45,
      translateY: 8,
      backgroundColor: "black",
    });

    buttonMidBarSpringApi.start({
      opacity: 0,
    });

    buttonBottomBarSpringApi.start({
      rotate: -45,
      translateY: -8,
      backgroundColor: "black",
    });

    setIsOpen(true);
  };

  const closeMenu = () => {
    onClose();

    buttonTopBarSpringApi.start({
      rotate: 0,
      translateY: 0,
      backgroundColor: color,
    });

    buttonMidBarSpringApi.start({
      opacity: 1,
    });

    buttonBottomBarSpringApi.start({
      rotate: 0,
      translateY: 0,
      backgroundColor: color,
    });
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="flex cursor-pointer flex-col gap-1"
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
      >
        <animated.div
          className="h-[2px] w-[23px] xl:w-[26px] 2xl:w-[30px]"
          style={{ ...buttonTopBarSprings }}
        />
        <animated.div
          className={`h-[2px] w-[23px] xl:w-[26px] 2xl:w-[30px] ${
            color === "white" ? "bg-white" : "bg-black"
          }`}
          style={{ ...buttonMidBarSprings }}
        />
        <animated.div
          className="h-[2px] w-[23px] xl:w-[26px] 2xl:w-[30px]"
          style={{ ...buttonBottomBarSprings }}
        />
      </div>
    </>
  );
};

const SiteMenuPanel = ({
  panelSprings,
}: {
  panelSprings: Record<string, SpringValue<string>>;
}) => {
  return (
    <animated.div
      className="fixed inset-0 z-30 bg-white p-8"
      style={{ ...panelSprings }}
    >
      <div className="flex  justify-center">
        <div className="mt-24 flex flex-col gap-12 md:mt-32 md:w-[80%] md:max-w-[1200px] md:flex-row md:items-center md:justify-between">
          <PageLinks />
          <SocialLinks />
        </div>
      </div>
    </animated.div>
  );
};

const PageLinks = () => {
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col gap-6">
        <PageLink href="/" text="Home" />
        <PageLink href="/albums" text="Albums" />
        <PageLink href="/videos" text="Videos" />
        <PageLink href="/about" text="About" />
      </div>
    </div>
  );
};

const PageLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} passHref>
      <p className="text-3xl tracking-wide xl:text-4xl">{text}</p>
    </Link>
  );
};

const SocialLinks = () => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-6">
        <p className="text-gray-400">contact</p>
        <p className="text-gray-400">facebook</p>
        <p className="text-gray-400">youtube</p>
      </div>
      <div className="flex flex-col gap-6">
        <a href="mailto:pirospixs@gmail.com" target="_blank">
          pirospixs@gmail.com
        </a>
        <a href="https://www.facebook.com/SeeInPictures/" target="_blank">
          @seeinpictures
        </a>
        <a
          href="https://www.youtube.com/playlist?list=PLdAjHO5OZG7y9CGvEG3Cf3ZgcaCL_p9fZ"
          target="_blank"
        >
          @piroska markus
        </a>
      </div>
    </div>
  );
};
