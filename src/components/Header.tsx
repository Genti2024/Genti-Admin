import { Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const headerConfig = [
  { to: '/', label: 'Admin' },
  { to: '/producer', label: 'Producer' },
  { to: '/user/info', label: 'User Info' },
  { to: '/user/report', label: 'User Report' },
  { to: '/cache', label: 'Cash' },
  { to: '/upload/preset', label: 'Upload Preset' },
]
const Header = () => {
  const location = useLocation().pathname
  return (
    <header className="sticky top-0 flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6">
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <p className="text-2xl text-green-500">Genti</p>
          <span className="sr-only">Genti</span>
        </Link>
        {headerConfig.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={`transition-colors ${
              location === item.to ? 'text-foreground' : 'text-muted-foreground'
            } hover:text-foreground`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-between gap-4 md:ml-auto md:gap-2 lg:gap-4 max-md:flex-1">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              {headerConfig.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`transition-colors ${
                    location === item.to ? 'text-foreground' : 'text-muted-foreground'
                  } hover:text-foreground`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base md:hidden">
          <p className="text-2xl text-green-500">Genti</p>
          <span className="sr-only">Genti</span>
        </Link>
        <Button onClick={() => window.open('https://dev.genti.kr/auth/v1/login/oauth2?oauthPlatform=KAKAO')}>
          로그인
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
