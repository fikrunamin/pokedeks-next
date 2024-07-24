import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod';

const schema = z.object({
    username: z.string().min(3, 'Username minimum consists of 3 characters'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not supported. Only GET method supported.' });
    }

    const data = req.body;
    const attributes = await schema.safeParseAsync(data);

    if(!attributes.success) {
        return res.status(400).json({
            errors: attributes.error.flatten().fieldErrors,
        });
    }

    res.setHeader('Set-Cookie', `username=${attributes.data.username}; Path=/; HttpOnly`);
    res.status(201).json({ 
        success: true,
        status_code: "HTTP_CREATED",
        message: `Welcome, ${attributes.data.username}!`,
     });
}