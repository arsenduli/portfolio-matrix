import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback, memo } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

// Memoized image component to prevent unnecessary re-renders
const TestimonialImage = memo(({ src, name, isActive, index, total, randomRotate }: {
  src: string;
  name: string;
  isActive: boolean;
  index: number;
  total: number;
  randomRotate: number;
}) => (
  <motion.div
    key={src}
    initial={{
      opacity: 0,
      scale: 0.9,
      z: -100,
      rotate: randomRotate,
    }}
    animate={{
      opacity: isActive ? 1 : 0.7,
      scale: isActive ? 1 : 0.95,
      z: isActive ? 0 : -100,
      rotate: isActive ? 0 : randomRotate,
      zIndex: isActive ? 999 : total + 2 - index,
      y: isActive ? [0, -80, 0] : 0,
    }}
    exit={{
      opacity: 0,
      scale: 0.9,
      z: 100,
      rotate: randomRotate,
    }}
    transition={{
      duration: 0.4,
      ease: "easeInOut",
    }}
    className="absolute inset-0 origin-bottom"
  >
    <img
      src={src}
      alt={name}
      width={500}
      height={500}
      loading="lazy"
      draggable={false}
      className="h-full w-full rounded-3xl object-cover object-center"
    />
  </motion.div>
));

// Memoized text animation component
const AnimatedText = memo(({ text }: { text: string }) => (
  <>
    {text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
          delay: Math.min(0.02 * index, 0.5), // Cap maximum delay
        }}
        className="inline-block"
      >
        {word}&nbsp;
      </motion.span>
    ))}
  </>
));

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [randomRotations] = useState(() => 
    testimonials.map(() => Math.floor(Math.random() * 21) - 10)
  );

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = useCallback((index: number) => {
    return index === active;
  }, [active]);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const currentTestimonial = testimonials[active];

  return (
    <div className="max-w-sm md:max-w-[76rem] mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <TestimonialImage
                  key={testimonial.src}
                  src={testimonial.src}
                  name={testimonial.name}
                  isActive={isActive(index)}
                  index={index}
                  total={testimonials.length}
                  randomRotate={randomRotations[index]}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-xl font-bold mb-2">
              {currentTestimonial.name}
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              {currentTestimonial.designation}
            </p>
            <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
              <AnimatedText text={currentTestimonial.quote} />
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
