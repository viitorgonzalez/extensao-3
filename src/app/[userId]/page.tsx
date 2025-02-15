'use client'

import { useParams } from 'next/navigation';
import { getNameById } from '@queries/testSupabase';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <p>ID do usuário não fornecido.</p>;
  }

  const fetchUserName = async () => {
    const username = await getNameById(userId);
    if (username) {
      return <h1>Bem-vindo, {username}!</h1>;
    } else {
      return <p>Usuário não encontrado.</p>;
    }
  };

  return (
    <div>
      {fetchUserName()}
    </div>
  );
};

export default UserProfile;

// 1a6f9b17-6068-4651-8f88-9e4766112c2d
