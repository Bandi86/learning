'use client';

import { motion } from 'framer-motion';
import SectionHeading from './Section-heading';
import { useSectionInView } from '@/lib/hooks';

const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28'
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id='about'
      ref={ref}
    >
      <SectionHeading>About me</SectionHeading>
      <p className='mb-3'>
        I am a web developer with a passion for design. I have been working in
        the web industry for over 10 years and have experience in a wide range
        of technologies and frameworks.
      </p>
      <p>
        I am currently working as a freelance web developer and I am always
        looking for new opportunities.
      </p>
    </motion.section>
  );
};

export default About;
