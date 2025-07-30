import { useState} from 'react'
import type { ChangeEvent, FormEvent } from 'react';
import TitleHeader from '../components/TitleHeader'

//When verbatimModuleSyntax is enabled in the TypeScript config, then use type-only imports for types that are only used for type annotations
interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    }); 

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target; 
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log('Submitted data:', formData);
        setFormData({name: '', email: '', message: ''});
    };

    return (
        <section id='contact' className='flex-center section-padding'>
            <div className='w-full h-full md:px-10 px-5'>
                <TitleHeader
                    title="Let's connect"
                    sub='Contact Information'
                />
                <div className='mt-16 grid-12-cols'>
                    <div className='xl:col-span-6 col-span-12'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-6'>
                                <label htmlFor="name">Name</label>
                                <input 
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Your name'
                                value={formData.name}
                                onChange={handleChange}/>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Contact