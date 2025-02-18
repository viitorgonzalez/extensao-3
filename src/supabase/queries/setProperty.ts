import { supabase } from "../config";
import { Property } from "../models/Property";

export const setProperty = async (property: Property) => {
    const { data, error } = await supabase
        .from('properties')
        .insert([
            {
                address: property.address,
                zone: property.zone,
                category: property.category
            }
        ])
        .select()

    if (error) {
        console.error('Erro ao inserir a propriedade' + error.message)
        return null
    }

    return data
}
