import express from 'express';
import { pool } from '../index.js';

const router = express.Router();

// GET /api/configuracion - Obtener configuración completa (config + usuarios)
router.get('/', async (req, res, next) => {
  try {
    // Obtener configuración
    const configResult = await pool.query(
      `SELECT fecha_inicio, usuario_inicial_id 
       FROM configuracion 
       ORDER BY id DESC 
       LIMIT 1`
    );

    // Obtener usuarios
    const usuariosResult = await pool.query(
      'SELECT id, nombre, color, orden FROM usuarios ORDER BY orden ASC'
    );

    // Si no hay configuración, crear una por defecto
    let config = configResult.rows[0];
    if (!config) {
      const firstUser = usuariosResult.rows[0];
      if (firstUser) {
        const newConfig = await pool.query(
          `INSERT INTO configuracion (fecha_inicio, usuario_inicial_id) 
           VALUES ('2025-09-08', $1) 
           RETURNING fecha_inicio, usuario_inicial_id`,
          [firstUser.id]
        );
        config = newConfig.rows[0];
      } else {
        return res.status(500).json({ error: 'No hay usuarios en el sistema' });
      }
    }

    res.json({
      fechaInicio: config.fecha_inicio.toISOString().split('T')[0],
      usuarios: usuariosResult.rows,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/configuracion - Actualizar fecha de inicio
router.put('/', async (req, res, next) => {
  try {
    const { fechaInicio } = req.body;

    if (!fechaInicio) {
      return res.status(400).json({ error: 'fechaInicio es requerida' });
    }

    // Validar formato de fecha
    const fecha = new Date(fechaInicio);
    if (isNaN(fecha.getTime())) {
      return res.status(400).json({ error: 'Formato de fecha inválido' });
    }

    // Verificar si existe configuración
    const existingConfig = await pool.query(
      'SELECT id FROM configuracion ORDER BY id DESC LIMIT 1'
    );

    let result;
    if (existingConfig.rows.length > 0) {
      // Actualizar configuración existente
      result = await pool.query(
        `UPDATE configuracion 
         SET fecha_inicio = $1, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $2 
         RETURNING fecha_inicio`,
        [fechaInicio, existingConfig.rows[0].id]
      );
    } else {
      // Crear nueva configuración
      const firstUser = await pool.query(
        'SELECT id FROM usuarios ORDER BY orden LIMIT 1'
      );
      
      if (firstUser.rows.length === 0) {
        return res.status(500).json({ error: 'No hay usuarios en el sistema' });
      }

      result = await pool.query(
        `INSERT INTO configuracion (fecha_inicio, usuario_inicial_id) 
         VALUES ($1, $2) 
         RETURNING fecha_inicio`,
        [fechaInicio, firstUser.rows[0].id]
      );
    }

    res.json({
      fechaInicio: result.rows[0].fecha_inicio.toISOString().split('T')[0],
      message: 'Configuración actualizada correctamente',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

