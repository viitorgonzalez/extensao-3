import { supabase } from "../../supabase/config";

interface AuthProps {
    email: string;
    password: string;
}

export const auth = async ({ email, password }: AuthProps): Promise<boolean> => {
    try {
        if (!email.trim() || !password.trim()) {
            alert('Preencha todos os campos.')
            return false
        }

        const { data: dataUser, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error || !dataUser.user) {
            console.error('Erro de login: ', error)
            alert('Email ou senha inválidos.')
            return false
        }

        return true
    } catch (error) {
        console.error('Erro ao autenticar: ', error)
        alert('Erro inesperado. Tente novamente.')
        return false
    }
}
