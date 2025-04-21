import { useRouter } from "next/navigation"
import { supabase } from "../../supabase/config"  // Certifique-se de importar corretamente o supabase

interface AuthProps {
    email: string;
    password: string;
}

export default function Auth({ email, password }: AuthProps) {
    const router = useRouter()

    const auth = async () => {
        try {
            const { data: dataUser, error } = await supabase
                .auth
                .signInWithPassword({
                    email,
                    password
                })

            if (dataUser) {
                router.push('/dashboard') // Redireciona para o dashboard após o login
            } else {
                console.error('Erro de login: ', error)
            }
        } catch (error) {
            console.error('Erro ao autenticar: ', error)
        }
    }

    return (
        <button
            onClick={auth}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
            Entrar
        </button>
    )
}
