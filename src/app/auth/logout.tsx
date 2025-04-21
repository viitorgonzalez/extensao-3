// app/auth/logout.ts
'use client'

import { supabase } from "../../supabase/config"

export const logout = async () => {
  try {
    const { data: { session: beforeSession }, error: beforeError } = await supabase.auth.getSession()
    
    if (beforeSession) {
      console.log("Usuário está logado:", beforeSession.user.email)
    } else {
      console.log("Usuário não está logado", beforeError)
    }
    
    await supabase.auth.signOut({ scope: 'local' })

  } catch (error) {
    console.error('Erro ao sair:', error)
  }
}
