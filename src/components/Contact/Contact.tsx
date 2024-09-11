import EmailIcon from '@/assets/email.svg?react';
import GithubIcon from '@/assets/github.svg?react';
import InstagramIcon from '@/assets/instagram.svg?react';

function Contact() {
    return (
        <div className='relative bg-purple-200 z-10 default-spacing grid grid-cols-2 py-24'>
            <div className='flex flex-col gap-6'>
                <h1 className='text-2xl font-bold'>Get in Touch</h1>
                <span>Have a question or a feedback in mind? I'd love to hear from you. Let's chat! I'm also available for mentorship.</span>
                <div className='flex gap-2 mt-4'><EmailIcon className='h-5 w-5' /> <a target="_blank" href='emailto:isabella.riquetti@outlook.com'>isabella.riquetti@outlook.com</a></div>
                <div className='mt-12 flex gap-4'>
                    <div className='rounded-full bg-white p-2'><a target="_blank" href='https://github.com/isabella-riquetti'><GithubIcon className='h-5 w-5' /></a></div>
                    <div className='rounded-full bg-white p-2'><a target="_blank" href='https://instagram.com/riquettinha'><InstagramIcon className='h-5 w-5' /></a></div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Contact;