import Link from 'next/link'
import ScrollStatus from './scroll-status'

const Header = () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b backdrop-blur'>
            <section className='flex h-14 justify-between items-center px-3'>
                <Link href={'/'} className='flex gap-2 items-center text-xl font-bold'>
                    Hyunseok
                </Link>
                <section>Navs</section>
            </section>
            <ScrollStatus />
        </header>
    )
}

export default Header
