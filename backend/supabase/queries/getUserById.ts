import { supabase } from "supabase/client";

export async function getUserById(id: string) {
    try {
        const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', id)
        .limit(1);

        if(error) {
            console.log("Erro ao acessar user no supabase")
            return false;
        }
        console.log("Sucesso ao acessar user no supabase");
    } catch(err) {
        console.error(err);
    }
}