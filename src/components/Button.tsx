// src/components/Button.tsx

interface ButtonProps {
  text: string;
  className?: string;
  id?: string;
  onClick?: () => void;
}

const Button = ({ text, className, id, onClick }: ButtonProps) => {
  return (
    <a 
      className={`cta-wrapper ${className || ''}`}
      id={id}
      onClick={(e) => {
        e.preventDefault();
        const target = document.getElementById('counter')
        if(target && id){
          const offset = window.innerHeight * 0.15;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo ({top, behavior : 'smooth'})
        }
      }}
    >
      <div className='cta-button group h-full w-full'>
        <div className='bg-circle h-full w-full flex items-center justify-center px-6 py-3'>
          <p className='text flex-1 text-center'>
            {text} 
          </p>
          <div className='arrow-wrapper ml-2'>
            <img src="/images/arrow-down.svg" alt="arrow" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default Button;