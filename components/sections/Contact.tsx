import AnimatedHeaderSection from "../animated-header-section/AnimatedHeaderSection";

function Contact() {
  const text = `Got a question, how or project Idea?
I would love to hear from you and discuss further!`;
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
      </div>
    </section>
  );
}

export default Contact;
