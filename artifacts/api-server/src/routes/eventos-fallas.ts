import { Router, Request, Response } from 'express';
import clientPromise from '../lib/mongodb';

const router = Router();

router.get('/eventos-fallas', async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || '';

    const client = await clientPromise;
    const db = client.db('app_castelar');
    const collection = db.collection('eventos_fallas');

    const searchQuery = query ? {
      $or: [
        { categoria: { $regex: query, $options: 'i' } },
        { evento: { $regex: query, $options: 'i' } },
        { descripcion: { $regex: query, $options: 'i' } },
        { codigo_tcms: { $regex: query, $options: 'i' } },
      ],
    } : {};

    const fallas = await collection.find(searchQuery).limit(50).toArray();

    return res.status(200).json(fallas);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Error al conectar con la base de datos' });
  }
});

export default router;