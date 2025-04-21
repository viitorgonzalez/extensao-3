import { supabase } from "../config"
import { Property } from "../models/Property"

export const getPropertiesByZoneAndCategory = async (property: Property) => {

    const  { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq('zone', property.zone)
        .eq('category', property.category)

        if (error) {
            console.error("Erro ao buscar propriedades: ", error)
            return []
        }

        return data
}