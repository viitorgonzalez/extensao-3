import { supabase } from '../supabase/config'

export const getNameById = async (userId: string) => {
    const { data, error } = await supabase
        .from('user')
        .select('username')
        .eq('id', userId)
        .single()

        if(error) {
            console.error('Erro ao recuperar o nome do usuário:', error);
            return null;
        } else {
            return data?.username || null;
          }
}