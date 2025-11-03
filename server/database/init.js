export async function initDatabase(pool) {
  try {
    // Crear tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        color VARCHAR(7) NOT NULL DEFAULT '#0ea5e9',
        orden INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de configuración
    await pool.query(`
      CREATE TABLE IF NOT EXISTS configuracion (
        id SERIAL PRIMARY KEY,
        fecha_inicio DATE NOT NULL,
        usuario_inicial_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Nota: No necesitamos índice único ya que solo guardamos una configuración por diseño

    // Verificar si ya hay datos
    const usuariosCount = await pool.query('SELECT COUNT(*) FROM usuarios');
    const configCount = await pool.query('SELECT COUNT(*) FROM configuracion');

    // Si no hay usuarios, crear los usuarios por defecto
    if (parseInt(usuariosCount.rows[0].count) === 0) {
      const carmen = await pool.query(`
        INSERT INTO usuarios (nombre, color, orden) 
        VALUES ('Carmen Hernández', '#0ea5e9', 1) 
        RETURNING *
      `);

      const azucena = await pool.query(`
        INSERT INTO usuarios (nombre, color, orden) 
        VALUES ('Azucena Hernández', '#d946ef', 2) 
        RETURNING *
      `);

      // Si no hay configuración, crear la configuración por defecto
      if (parseInt(configCount.rows[0].count) === 0) {
        await pool.query(`
          INSERT INTO configuracion (fecha_inicio, usuario_inicial_id) 
          VALUES ('2025-09-08', $1)
        `, [carmen.rows[0].id]);
      }
    } else if (parseInt(configCount.rows[0].count) === 0) {
      // Si hay usuarios pero no configuración, crear configuración con el primer usuario
      const firstUser = await pool.query('SELECT id FROM usuarios ORDER BY orden LIMIT 1');
      if (firstUser.rows.length > 0) {
        await pool.query(`
          INSERT INTO configuracion (fecha_inicio, usuario_inicial_id) 
          VALUES ('2025-09-08', $1)
        `, [firstUser.rows[0].id]);
      }
    }

    console.log('📊 Tablas creadas/verificadas correctamente');
  } catch (error) {
    console.error('Error al inicializar base de datos:', error);
    throw error;
  }
}

