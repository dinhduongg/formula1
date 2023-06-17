import Searchbar from './components/Searchbar'
import Searchbar1 from './components/Searchbar1'
import './globals.css'
import { Fira_Code } from 'next/font/google'

const playfair = Fira_Code({ 
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Formola1 result',
  description: 'This is a result of formula1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        <Searchbar1 />
        {/* <Searchbar /> */}
        {children}
      </body>
    </html>
  )
}
