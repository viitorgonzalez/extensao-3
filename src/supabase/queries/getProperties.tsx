import { supabase } from "../config"

export const getProperties = async () => {
    const  { data, error } = await supabase
        .from("properties")
        .select("*")


        if (error) {
            console.error("Erro ao buscar propriedades: ", error)
            return []
        }

        return data
}