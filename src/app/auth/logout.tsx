import { supabase } from "../../supabase/config"

export const logout = async () => {
  try {
    
    await supabase.auth.signOut()
  
  } catch (error) {
    console.error('Erro ao sair:', error)
  }
}
