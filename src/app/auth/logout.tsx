// app/auth/logout.ts
import { supabase } from "../../supabase/config"

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) {
      console.error('Erro ao sair:', error)
    }
  } catch (error) {
    console.error('Erro ao sair:', error)
  }
}
