import { supabase } from "../../supabase/config";

interface AuthProps {
    email: string;
    password: string;
}

export const auth = async ({ email, password }: AuthProps) => {

    if (!email || !password) {
        alert('Preencha todos os campos.')
        return
    }
    try {
        const { data: dataUser, error } = await supabase
            .auth
            .signInWithPassword({
                email,
                password
            })

        if (!dataUser) {
            console.error('Erro de login: ', error)
        }
    } catch (error) {
        console.error('Erro ao autenticar: ', error)
    }
}

