"use client";
import { socials } from "@/constants/constants";
import AnimatedHeaderSection from "../animated-header-section/AnimatedHeaderSection";
import Marquee from "../marquee/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Contact() {
  const text = `Got a question, how or project Idea?
I would love to hear from you and discuss further!`;
  const items = [
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle="You Dream It. I code it."
          title="Works"
          text={text}
          textColor="text-white"
          withScrollTrigger={true}
        />
        <div className="flex flex-col px-10 font-light text-white uppercase lg:text[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30"></div>
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                Mohamedelamahalwy@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30"></div>
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                +20 11 46 33 00 68
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30"></div>
              <div className="flex flex-wrap ga-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-xs leading-loose tracking-widest md:text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
}

export default Contact;
