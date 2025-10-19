import ScrollGradientText from "../textAnimation/ScrollGradientText"
import CV from '../../assets/cv.pdf'

const About = () => {
  return (
<section id='about' className='h-auto w-[90%] max-w-[800px] mx-auto py-15 translate-x-0 bg-gradient-to-b from-white/20 to-white/5 dark:from-gray-800/40 dark:to-gray-900/20 backdrop-blur-xl shadow-2xl border-l border-white/10 dark:border-gray-800/40'>
   <h1 className='text-4xl md:text-6xl logo_font text-center mb-8'>About me</h1>
   <div className=' text-lg md:text-xl mx-auto px-3'>
<ScrollGradientText text={"Hi, I’m Gautam Mishra — a self-driven Full Stack Developer who loves turning ideas into real, working web products.I enjoy building everything from small interactive interfaces to complex backend systems.My projects reflect my passion for problem-solving, clean code, and modern web technologies."} className=' tracking-wide mx-auto'/>

<ScrollGradientText text={"Education:"} className={'text-xl md:text-2xl font-semibold px-3 pt-10 pb-2'}/>

 <p className=' tracking-wide mb-10'>
  
<ScrollGradientText text={"I'm an aspiring software developer currently pursuing a B.Tech degree in Computer Science and Engineering from Calcutta Institute of Engineering And Management, with an expected graduation in 2027, focusing on web development, algorithms, data structures, and databases."} />
  
</p>
 
   <a className='relative px-6 py-3 font-semibold text-white rounded-xl 
         bg-gradient-to-r from-blue-500 to-purple-600
         hover:from-purple-600 hover:to-pink-500
         transition-all duration-500
         dark:from-gray-700 dark:to-gray-900
         dark:hover:from-indigo-500 dark:hover:to-purple-700
         shadow-md hover:shadow-xl'  href={CV} download="Gautam_Mishra_CV.pdf">Download CV</a>
   </div>
   
</section>
  )
}

export default About
