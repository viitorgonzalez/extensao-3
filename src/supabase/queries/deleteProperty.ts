import { supabase } from "../config";

// Função para deletar uma propriedade com base no id
export const deleteProperty = async (propertyId: number) => {
    const { data, error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);  // Passa o id da propriedade a ser deletada

    if (error) {
        console.error('Erro ao deletar propriedade:', error);
        return { success: false, message: 'Erro ao deletar a propriedade.' };
    }

    return { success: true, message: 'Propriedade deletada com sucesso.', data };
};
