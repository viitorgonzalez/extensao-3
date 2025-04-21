import { supabase } from "../config";
import { Property } from "../models/Property";

export const updateProperty = async (property: Property) => {
    const { data, error } = await supabase
        .from('properties')
        .update({
            street: property.address?.street,
            number: property.address?.number,
            neighborhood: property.address?.neighborhood,
            zone: property.zone,
            category: property.category,
        })
        .eq('id', property.id); // Faz o update da propriedade com o id específico

    if (error) {
        console.error(error);
        return null;
    }

    return data;
};
