import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    const client = await clientPromise;
    const db = client.db('app_castelar'); // Asegúrate que el nombre de la DB es correcto
    const collection = db.collection('eventos_fallas');

    // Creamos una consulta para buscar en varios campos.
    // El índice 'i' hace que la búsqueda no distinga mayúsculas/minúsculas.
    const searchQuery = query ? {
      $or: [
        { categoria: { $regex: query, $options: 'i' } },
        { evento: { $regex: query, $options: 'i' } },
        { descripcion: { $regex: query, $options: 'i' } },
        { codigo_tcms: { $regex: query, $options: 'i' } },
      ],
    } : {};

    const fallas = await collection.find(searchQuery).limit(50).toArray();

    return NextResponse.json(fallas);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al conectar con la base de datos' }, { status: 500 });
  }
}