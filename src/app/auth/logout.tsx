// app/auth/logout.ts
'use client'

import { supabase } from "../../supabase/config"
import { redirect } from "next/navigation"

export const logout = async () => {
  try {
    await supabase.auth.signOut()
    redirect('/login')
  } catch (error) {
    console.error('Erro ao sair:', error)
  }
}
