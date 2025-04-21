import { supabase } from "../config"
import { Property } from "../models/Property"

export const getProperty = async (property: Property) => {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('address->>street', property.address.street)
        .eq('address->>number', String(property.address.number))
        .eq('address->>neighborhood', property.address.neighborhood)
        .eq('zone', property.zone)
        .eq('category', property.category)

        if (error) {
            console.error(error)
            return []
        }

        return data
    }