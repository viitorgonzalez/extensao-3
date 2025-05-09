'use client'


import { useRouter } from 'next/navigation'
import { logout } from '../app/auth/logout'

const Header = () => {
  const router = useRouter()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await logout() // faz o signOut no supabase
    } catch (error) {
      console.error(error)
    }

    router.refresh()
  }

  return (
    <div className="flex h-[10%] rounded-lg">
      <div className="ml-4 px-6 py-2 flex items-center bg-[#B0B87A] text-white rounded-full">
        Logo
      </div>
      <button
        onClick={handleLogout}
        className="ml-auto mr-4 px-4 py-1 flex items-center justify-center self-center bg-[#B0B87A] rounded-full text-white"
      >
        Sair
      </button>
    </div>
  )
}

export default Header
