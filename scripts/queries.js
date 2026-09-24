// ============================================
// ByteClass - Fase 2: Consultas y Operaciones MQL
// Base de datos: byteclass
// ============================================

use("byteclass");

// -------- PASO 3: CONSULTAS DE LECTURA --------

// 1. Filtrado básico por coincidencia exacta
// Trae todos los cursos dictados por un instructor específico
db.courses.find({ instructor_id: ObjectId("60d5ec49f1b2c8a1b4e10001") });

// 2. Operador de comparación ($gt)
// Trae inscripciones con más del 50% de avance (para detectar alumnos avanzados)
db.enrollments.find({ "progress.percentage": { $gt: 50 } });

// 3. Notación de punto sobre campos anidados
// Trae cursos con rating promedio mayor a 4.5, para armar el catálogo de destacados
db.courses.find({ "rating_summary.average": { $gt: 4.5 } });

// 4. Proyección de campos específicos (excluyendo _id)
// Trae nombre y mail de todos los estudiantes, sin exponer datos sensibles
db.users.find(
  { role: "student" },
  { _id: 0, name: 1, email: 1 }
);

// 5. Filtrado de elementos dentro de un arreglo ($elemMatch)
// Trae inscripciones donde el alumno ya completó la lección "l1"
db.enrollments.find({
  "progress.completed_lessons": { $elemMatch: { $eq: "l1" } }
});


// -------- PASO 4: OPERACIONES DE ESCRITURA --------

// 1. Actualización con $set: modifica un campo y agrega uno nuevo
// Actualiza la descripción del curso y lo marca como destacado en el catálogo
db.courses.updateOne(
  { _id: ObjectId("60d5ec49f1b2c8a1c5e10101") },
  {
    $set: {
      description: "Curso completo de desarrollo backend usando Node.js, Express y MongoDB. Actualizado 2026.",
      featured: true
    }
  }
);

// 2. Actualización atómica con $inc: incrementa un contador numérico
// Suma una reseña más al contador total_reviews del curso, sin recalcular todo
db.courses.updateOne(
  { _id: ObjectId("60d5ec49f1b2c8a1c5e10101") },
  { $inc: { "rating_summary.total_reviews": 1 } }
);

// 3. Eliminación segura con deleteOne bajo criterio estricto (_id)
// Elimina una comisión puntual que quedó sin uso (dada de baja por falta de inscriptos)
db.commissions.deleteOne(
  { _id: ObjectId("60d5ec49f1b2c8a1d6e10210") }
);
