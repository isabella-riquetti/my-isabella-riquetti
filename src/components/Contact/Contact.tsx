import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@mui/material';

function Contact() {
    const [state, handleSubmit] = useForm("mblredja");

    return (
        <div className='relative z-10 bg-purple-200' id="contact">
            <div className="absolute top-[140px] left-[-120px] z-20 w-48 h-48 bg-purple-600 rounded-full hidden lg:block"></div>
            <div className='default-spacing grid grid-cols-1 md:grid-cols-2 py-12 md:py-24 gap-8'>
                <div className='flex flex-col gap-6'>
                    <h1 className='text-2xl font-bold'>Get in Touch</h1>
                    <span>Have a question or a feedback in mind? I'd love to hear from you. Let's chat! I'm also available for mentorship.</span>
                    <div className='flex gap-2 mt-4'><EmailIcon /> <a target="_blank" href='emailto:isabella.riquetti@outlook.com'>isabella.riquetti@outlook.com</a></div>
                    <div className='mt-auto flex gap-4'>
                        <div className='rounded-full bg-white p-2'><a target="_blank" href='https://github.com/isabella-riquetti' className='flex items-center justify-center'><GitHubIcon /></a></div>
                        <div className='rounded-full bg-white p-2'><a target="_blank" href='https://instagram.com/riquettinha' className='flex items-center justify-center'><InstagramIcon /></a></div>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
                        <input
                            placeholder='First Name*'
                            id="firstName"
                            type="firstName"
                            name="firstName"
                            required
                            className='p-2'
                        />
                        <ValidationError
                            prefix="First Email"
                            field="firstName"
                            errors={state.errors}
                        />
                        <input
                            placeholder='Email*'
                            id="email"
                            type="email"
                            name="email"
                            required
                            className='p-2'
                        />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                            className='p-2'
                        />
                        <input
                            placeholder='Phone Number'
                            id="phoneNumber"
                            type="phoneNumber"
                            name="phoneNumber"
                            className='p-2'
                        />
                        <ValidationError
                            prefix="Phone Number"
                            field="phoneNumber"
                            errors={state.errors}
                        />
                        <textarea
                            placeholder='Message*'
                            id="message"
                            name="message"
                            required
                            minLength={30}
                            className='p-2 h-32'
                        />
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                        />
                        <div className='flex flex-col md:flex-row items-center gap-3'>
                            <Button type="submit" disabled={state.submitting || state.succeeded} className='bg-black-950 text-white disabled:opacity-20'>
                                Submit
                            </Button>
                            {(state.submitting || state.succeeded) && <p className='text-purple-900 font-semibold'>Thanks for the contact, will get back ASAP.</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;