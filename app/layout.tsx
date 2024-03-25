import Header from '@/components/header/header'
import './globals.css'
import 'video.js/dist/video-js.css'
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang='ko'>
            <body className='container max-w-screen-xl'>
                <Header />
                {children}
            </body>
        </html>
    )
}

export default RootLayout
