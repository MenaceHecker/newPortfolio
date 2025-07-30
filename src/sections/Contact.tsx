import { useState } from 'react'
import TitleHeader from '../components/TitleHeader'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
  return (
    <section id='contact' className='flex-center section-padding'>
        <div className='w-full h-full md:px-10 px-5'>
            <TitleHeader
            title="Let's connect"
            sub='Contact Information'
            />
        </div>
    </section>
  )
}

export default Contact