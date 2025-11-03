import express from 'express';
import { pool } from '../index.js';

const router = express.Router();

// GET /api/usuarios - Obtener todos los usuarios
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, color, orden FROM usuarios ORDER BY orden ASC'
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET /api/usuarios/:id - Obtener un usuario por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, nombre, color, orden FROM usuarios WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// PUT /api/usuarios/:id - Actualizar un usuario
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, color } = req.body;

    if (!nombre || !color) {
      return res.status(400).json({ error: 'Nombre y color son requeridos' });
    }

    const result = await pool.query(
      `UPDATE usuarios 
       SET nombre = $1, color = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3 
       RETURNING id, nombre, color, orden`,
      [nombre, color, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// POST /api/usuarios - Crear un nuevo usuario (opcional)
router.post('/', async (req, res, next) => {
  try {
    const { nombre, color, orden } = req.body;

    if (!nombre || !color) {
      return res.status(400).json({ error: 'Nombre y color son requeridos' });
    }

    const maxOrden = await pool.query('SELECT MAX(orden) as max FROM usuarios');
    const newOrden = orden || (parseInt(maxOrden.rows[0].max) || 0) + 1;

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, color, orden) 
       VALUES ($1, $2, $3) 
       RETURNING id, nombre, color, orden`,
      [nombre, color, newOrden]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;

