function Footer() {
    return (
        <footer className='relative z-10 bg-purple-200'>
            <div className='default-spacing pb-8 pt-4 flex flex-col gap-2 text-sm text-black-500'>
                <span className='font-semibold text-black-700'>© {new Date().getFullYear()} Isabella Riquetti</span>
                <p>
                    This page counts visits with PostHog (EU servers) without cookies and stores nothing on your device: page, referrer, browser, device type and approximate country.
                    The contact form is delivered by Formspree; what you type there is sent to me by e-mail and kept only to reply.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
