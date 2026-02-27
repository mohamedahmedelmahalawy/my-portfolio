"use client";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Observer);

// ---------- Types ----------

interface MarqueeProps {
  items?: string[];
  className?: string;
  icon?: string;
  iconClassName?: string;
  reverse?: boolean;
}

interface HorizontalLoopConfig {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | false;
  paddingRight?: number | string;
  reversed?: boolean;
}

interface HorizontalLoopTimeline extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  current: () => number;
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  times: number[];
}

// ---------- Component ----------

function Marquee({
  items = [],
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}: MarqueeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  function horizontalLoop(
    elements: HTMLElement[],
    config: HorizontalLoopConfig,
  ): HorizontalLoopTimeline {
    const items = gsap.utils.toArray<HTMLElement>(elements);
    config = config || {};

    const tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      },
    }) as HorizontalLoopTimeline;

    const length: number = items.length;
    const startX: number = items[0].offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const xPercents: number[] = [];
    let curIndex: number = 0;
    const pixelsPerSecond: number = (config.speed || 1) * 100;
    const snap: (v: number) => number =
      config.snap === false
        ? (v: number) => v
        : gsap.utils.snap(config.snap || 1);
    let totalWidth: number;
    let curX: number;
    let distanceToStart: number;
    let distanceToLoop: number;

    gsap.set(items, {
      xPercent: (i: number, el: HTMLElement) => {
        const w = (widths[i] = parseFloat(
          gsap.getProperty(el, "width", "px") as string,
        ));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
            (gsap.getProperty(el, "xPercent") as number),
        );
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });

    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        (gsap.getProperty(items[length - 1], "scaleX") as number) +
      (parseFloat(config.paddingRight as string) || 0);

    for (let i = 0; i < length; i++) {
      const item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart +
        widths[i] * (gsap.getProperty(item, "scaleX") as number);

      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0,
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond,
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);

      times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }
      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }

    tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);

    // Fix: reversed config must set timeScale to -1 AFTER pre-render,
    // not rely on tl.reverse() which conflicts with repeat:-1 looping.
    // Using timeScale(-1) keeps the loop intact while playing backwards.
    if (config.reversed) {
      tl.timeScale(-1);
    }

    return tl;
  }

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const els = Array.from(wrapper.children) as HTMLElement[];
    if (els.length === 0) return;

    const tl = horizontalLoop(els, {
      repeat: -1,
      speed: 1.2, // Calm, readable speed — tweak between 0.8–2 to taste
      paddingRight: 30,
      reversed: reverse,
    });

    const observer = Observer.create({
      onChangeY(self: Observer) {
        let factor = 2.5;
        if (self.deltaY < 0) factor *= -1;
        // Respect reverse direction when boosting scroll speed
        const direction = reverse ? -1 : 1;
        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tl, {
            timeScale: direction * factor * 2.5,
            duration: 0.2,
            overwrite: true,
          })
          .to(tl, { timeScale: direction * 1, duration: 1 }, "+=0.3");
      },
    });

    return () => {
      tl.kill();
      observer.kill();
    };
  }, [items, reverse]);

  return (
    <div
      className={`overflow-hidden w-full h-20 md:h-25 flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}
    >
      <div
        ref={wrapperRef}
        style={{ position: "relative", whiteSpace: "nowrap" }}
      >
        {items.map((text: string, index: number) => (
          <span
            key={index}
            style={{ display: "inline-flex", alignItems: "center" }}
            className="px-16 gap-x-32"
          >
            {text} <Icon icon={icon} className={iconClassName} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
