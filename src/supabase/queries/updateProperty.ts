import { supabase } from "../config";
import { Property } from "../models/Property";

export const updateProperty = async (property: Property) => {
    const { data, error } = await supabase
        .from('properties')
        .update({
            address: property.address,
            zone: property.zone,
            category: property.category,
        })
        .eq('id', property.id);

    if (error) {
        console.error(error);
        return null;
    }

    return {success: true, data};
};
