// pages/api/create-user.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface CreateUserRequest {
  userId: string;
  username: string;
  email: string;
}

const createUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const userData: CreateUserRequest = req.body;

	console.log("Creating user data", userData);
	

    try {
      // Call the second server's API to create the user
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_BASE_URL}/users` || "", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user on the second server');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default createUserHandler;
