require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Servir la carpeta de planos estática
app.use('/planos', express.static(path.join(__dirname, '../artifacts/deposito-castelar/public/planos')));
// Servir la carpeta de Eventos estática
app.use('/eventos', express.static(path.join(__dirname, '../artifacts/deposito-castelar/public/Eventos')));

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const buildSecondDigitRegex = (code) => {
  const text = String(code);
  if (!/^[0-9]+$/.test(text) || text.length < 2) return null;
  return new RegExp(`^${text[0]}[0-9]${text.slice(2)}$`);
};

async function run() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB con éxito!");

    const db = client.db('app_castelar');
    const fallasCollection = db.collection('eventos_fallas');
    const planillasCollection = db.collection('planillas_completadas');

    try {
      await fallasCollection.dropIndexes();
    } catch (e) {}

    await fallasCollection.createIndex({
      categoria: "text",
      evento: "text",
      descripcion: "text",
      codigo_tcms: "text"
    }, { name: "idx_busqueda_fallas_texto" });

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

    app.get('/api/fallas', async (req, res) => {
      const query = req.query.q || '';
      const queryConditions = [
        { categoria: { $regex: query, $options: 'i' } },
        { evento: { $regex: query, $options: 'i' } },
        { descripcion: { $regex: query, $options: 'i' } },
      ];

      const numericVal = Number(query);
      if (!isNaN(numericVal) && query.trim() !== '') {
        const secondDigitRegex = buildSecondDigitRegex(query);
        if (secondDigitRegex) {
          queryConditions.push({ codigo_tcms: secondDigitRegex });
        }
        queryConditions.push({ codigo_tcms: { $regex: query, $options: 'i' } });
      } else {
        queryConditions.push({ codigo_tcms: { $regex: query, $options: 'i' } });
      }

      const searchQuery = query ? { $or: queryConditions } : {};

      try {
        const fallas = await fallasCollection.find(searchQuery).limit(50).toArray();

        // Mapeamos los resultados para agregar el nombre de archivo del PDF de evento
        const fallasConPdf = fallas.map(falla => {
          const categoriaTexto = (falla.categoria || '').toUpperCase();
          let eventoPdfFile = null;

          if (categoriaTexto.includes('TCMS')) eventoPdfFile = '01 - Eventos TCMS.pdf';
          else if (categoriaTexto.includes('DCU')) eventoPdfFile = '02 - Eventos DCU.pdf';
          else if (categoriaTexto.includes('SIV')) eventoPdfFile = '03 - Eventos SIV.pdf';
          else if (categoriaTexto.includes('EBCU')) eventoPdfFile = '04 - Eventos EBCU.pdf';
          else if (categoriaTexto.includes('HVAC')) eventoPdfFile = '05 - Eventos HVAC.pdf';
          else if (categoriaTexto.includes('EDCU')) eventoPdfFile = '06 - Eventos EDCU.pdf';
          else if (categoriaTexto.includes('PIDS')) eventoPdfFile = '07 - Eventos PIDS.pdf';

          // Devolvemos el objeto original de la falla con el nuevo campo 'eventoPdf'
          return { ...falla, eventoPdf: eventoPdfFile };
        });

        res.json(fallasConPdf);

      } catch (error) {
        res.status(500).json({ error: "Error al buscar en la base de datos" });
      }
    });

    app.post('/api/chat', async (req, res) => {
      try {
        const { message } = req.body;

        if (!message) {
          return res.status(400).json({ error: "No se proporcionó ningún mensaje." });
        }

        const queryVal = message.trim();
        const numericVal = Number(queryVal);

        const queryConditions = [
          { categoria: { $regex: queryVal, $options: 'i' } },
          { evento: { $regex: queryVal, $options: 'i' } },
          { descripcion: { $regex: queryVal, $options: 'i' } },
          { plano: { $regex: queryVal, $options: 'i' } }
        ];

        if (!isNaN(numericVal)) {
          const secondDigitRegex = buildSecondDigitRegex(queryVal);
          if (secondDigitRegex) {
            queryConditions.push({ codigo_tcms: secondDigitRegex });
          }
          queryConditions.push({ codigo_tcms: numericVal });
          queryConditions.push({ codigo_tcms: { $regex: queryVal, $options: 'i' } });
          queryConditions.push({ numero_evento: numericVal });
          queryConditions.push({ numero_evento: { $regex: queryVal, $options: 'i' } });
        } else {
          queryConditions.push({ codigo_tcms: { $regex: queryVal, $options: 'i' } });
          queryConditions.push({ numero_evento: { $regex: queryVal, $options: 'i' } });
        }

        const searchResults = await fallasCollection.find({ $or: queryConditions }).limit(1).toArray();

        if (searchResults.length === 0) {
          return res.json({ reply: `Con la información provista en la base de datos, no es posible determinar a qué se refiere tu consulta sobre "${message}".` });
        }

        const falla = searchResults[0];
        const descTexto = Array.isArray(falla.descripcion) ? falla.descripcion.join(' - ') : falla.descripcion;
        const resTexto = Array.isArray(falla.resolucion) ? falla.resolucion.join(' - ') : falla.resolucion;
        const planoTexto = falla.plano || '';
        const codigoTexto = falla.codigo_tcms || 'N/A';
        const eventoTexto = falla.evento || 'N/A';
        const categoriaTexto = (falla.categoria || '').toUpperCase();

        // Extraer los números que figuran en el campo plano de la base de datos
        const numerosPlanos = planoTexto.match(/\d+/g) || [];

        // Si el número es menor a 10, le anteponemos un "0" (ej: 5 pasa a "05" -> SFM05). 
        // Del 10 en adelante quedan igual (ej: 17 -> SFM17).
        const planosArray = numerosPlanos.map(num => {
          const numeroFormateado = Number(num) < 10 && !num.startsWith('0') ? `0${num}` : num;
          return `SFM${numeroFormateado}`;
        });

        // Mapeo exacto de la categoría al nombre real del PDF de eventos
        let eventoPdfFile = null;
        if (categoriaTexto.includes('TCMS')) eventoPdfFile = '01 - Eventos TCMS.pdf';
        else if (categoriaTexto.includes('DCU')) eventoPdfFile = '02 - Eventos DCU.pdf';
        else if (categoriaTexto.includes('SIV')) eventoPdfFile = '03 - Eventos SIV.pdf';
        else if (categoriaTexto.includes('EBCU')) eventoPdfFile = '04 - Eventos EBCU.pdf';
        else if (categoriaTexto.includes('HVAC')) eventoPdfFile = '05 - Eventos HVAC.pdf';
        else if (categoriaTexto.includes('EDCU')) eventoPdfFile = '06 - Eventos EDCU.pdf';
        else if (categoriaTexto.includes('PIDS')) eventoPdfFile = '07 - Eventos PIDS.pdf';

        const promptGuia = `
        Actúa como un asistente práctico y directo de mantenimiento ferroviario.
        No repitas texto literal del manual, PDF o descripción original.
        Usa sólo los datos de la falla para entregar una solución clara y aplicable en campo.
        - Código / Evento: ${codigoTexto} - ${eventoTexto}
        - Categoría: ${categoriaTexto}
        - Planos Asociados: ${planoTexto}
        - Descripción: ${descTexto}
        - Resolución: ${resTexto}

        Responde de la siguiente manera:
        1. Breve identificación del problema.
        2. Pasos claros y prácticos para resolverlo en cancha.
        3. No copies ni cites el PDF; simplifica.
        4. Si no hay suficientes datos, indica qué verificar primero.
        `;

        const result = await model.generateContent(promptGuia);
        const response = await result.response;
        
        res.json({ 
          reply: response.text(),
          fallaData: {
            codigo: codigoTexto,
            evento: eventoTexto,
            planos: planosArray, // Enviamos el array limpio para que React dibuje los botones del modal
            eventoPdf: eventoPdfFile // Envía el nombre exacto del archivo PDF de eventos al frontend
          }
        });
      } catch (error) {
        console.error("Error en el chat con IA:", error);
        res.status(500).json({ error: "Error al comunicarse con el asistente de IA." });
      }
    });

    app.post('/api/planillas', async (req, res) => {
      try {
        const planillaData = req.body;
        if (!planillaData || !planillaData.tipoPlanilla || !planillaData.equipo) {
          return res.status(400).json({ error: "Datos incompletos." });
        }
        planillaData.createdAt = new Date();
        const result = await planillasCollection.insertOne(planillaData);
        res.status(201).json({ success: true, insertedId: result.insertedId });
      } catch (error) {
        res.status(500).json({ error: "Error al guardar en la base de datos." });
      }
    });

    // Endpoint para obtener el historial de planillas guardadas
    app.get('/api/planillas', async (req, res) => {
      try {
        const planillas = await planillasCollection.find({}).sort({ createdAt: -1 }).limit(100).toArray();
        res.json(planillas);
      } catch (error) {
        console.error("Error al obtener el historial de planillas:", error);
        res.status(500).json({ error: "Error al obtener el historial de planillas." });
      }
    });

    // Nueva ruta para ELIMINAR una planilla del historial
    app.delete('/api/planillas/:id', async (req, res) => {
      try {
        const { id } = req.params;
        // Necesitamos convertir el ID de string a un ObjectId de MongoDB
        const { ObjectId } = require('mongodb'); // Asegúrate que mongodb esté instalado
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: "ID de planilla no válido." });
        }
        await planillasCollection.deleteOne({ _id: new ObjectId(id) });
        res.json({ success: true, message: "Planilla eliminada correctamente." });
      } catch (error) {
        console.error("Error al eliminar la planilla:", error);
        res.status(500).json({ error: "Error al eliminar la planilla de la base de datos." });
      }
    });

    const port = process.env.PORT || 3001;
    // ...
    app.listen(port, () => {
    console.log(`🚀 Servidor API escuchando en el puerto ${port}`);
    });

  } catch (e) {
    console.error("❌ No se pudo conectar a MongoDB", e);
    process.exit(1);
  }
}

run();