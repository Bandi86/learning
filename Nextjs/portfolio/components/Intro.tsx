'use client';
import Image from 'next/image';
import { BsArrowRight, BsGithub, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSectionInView } from '@/lib/hooks';
import { useActiveSection } from '@/context/active-section';

const Intro = () => {
  const { ref } = useSectionInView('Home', 0.5);
  const {setActiveSection, setTimeOfLastClick} = useActiveSection()

  return (
    <section
      ref={ref}
      id='home'
      className='mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]'
    >
      <div className='flex items-center justify-center'>
        <div className='relative'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2,
            }}
          >
            <Image
              src='https://images.unsplash.com/photo-1617196701537-7329482cc9fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='me'
              width={200}
              height={200}
              quality={95}
              priority={true}
              className='h-24 w-24 rounded-full border-[0.35rem] object-cover border-white shadow-xl'
            />
          </motion.div>
          <motion.span
            className='absolute text-4xl bottom-0 right-0'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👏
          </motion.span>
        </div>
      </div>
      <motion.p
        className='mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hi, I'm <span className='font-bold'>Kamal</span>. I'm a full-stack
        developer and a designer. I love to build things for the web.
      </motion.p>
      <motion.div
        className='flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href='/contact'
          className='group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 transition-transform hover:bg-gray-950 active:scale-105'
          onClick={() =>  {setActiveSection("Contact"); setTimeOfLastClick(Date.now())}}
        >
          Contact me
          <BsArrowRight className='opacity-70 group-hover:translate-x-1 transition' />
        </Link>
        <a
          className='group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 transition-transform active:scale-105 cursor-pointer borderBlack dark:bg-white/10'
          href='/CV.pdf'
          download
        >
          Download CV{' '}
          <HiDownload className='opacity-60 group-hover:transalte-y-1 transition' />
        </a>
        <a
          className='bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 transition-transform active:scale-105 cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60'
          href='https://www.linkedin.com/in/kamal-chaoui-1b1b3b1b0/'
          target='_blank'
        >
          <BsLinkedin />
        </a>
        <a
          className='bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full text-[1.35rem] focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 transition-transform active:scale-105 cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60'
          href='http://www.github.com/kamalchaoui'
          target='_blank'
        >
          <BsGithub />
        </a>
      </motion.div>
    </section>
  );
};

export default Intro;
