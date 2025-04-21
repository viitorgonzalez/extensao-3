// app/auth/logout.ts
import { supabase } from "../../supabase/config"

export const logout = async () => {
  try {
    // Verifica se há uma sessão ativa
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      console.log('Nenhuma sessão ativa encontrada')
      return
    }

    // const { error } = await supabase.auth.signOut()
    localStorage.removeItem('sb-auth-token')
    localStorage.removeItem('sb-refresh-token')

    // if (error) {
    //   console.error('Erro ao sair:', error)
    //   throw error
    }
  // } catch (error) {
  //   console.error('Erro ao sair:', error)
  //   throw error
  // }
