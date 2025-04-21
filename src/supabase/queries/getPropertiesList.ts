import { supabase } from "../config"
import { Property } from "../models/Property"

export const getPropertiesList = async (property: Property) => {
    let query = supabase
        .from("properties")
        .select("*")

    // Só aplica o filtro de zona se for diferente de "Todas"
    if (property.zone && property.zone !== "Todas") {
        query = query.eq('zone', property.zone)
    }

    // Aplica o filtro de categoria se existir
    if (property.category) {
        query = query.eq('category', property.category)
    }

    const { data, error } = await query

    if (error) {
        console.error("Erro ao buscar propriedades: ", error)
        return []
    }

    return data
}
