// app/auth/logout.ts
'use client'

import { redirect } from "next/navigation"
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
    redirect('/login')
    // Verifica novamente após logout
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: { session: afterSession }, error: afterError } = await supabase.auth.getSession()

    if (!afterSession) {
      console.log("Logout bem-sucedido: usuário não está mais logado.")
    } else {
      console.log("Algo deu errado: usuário ainda logado:", afterSession.user.email)
    }
    
  } catch (error) {
    console.error('Erro ao sair:', error)
  }
}
