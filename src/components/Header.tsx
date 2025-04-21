'use client'

import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    })
    router.push('/auth')
  }

  return (
    <div className="flex h-[10%] rounded-lg">
      <div className="ml-4 px-6 py-2 flex items-center bg-gray-600 text-white rounded-full">
        Logo
      </div>
      <button
        onClick={handleLogout}
        className="ml-auto mr-4 px-4 py-1 flex items-center justify-center self-center bg-gray-600 rounded-full text-white"
      >
        Sair
      </button>
    </div>
  )
}

export default Header
