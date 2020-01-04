const models = require('../models');
const jwtDecode = require('jwt-decode');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getPattern = async (req, res) => {
  try {
    const { codeId } = req.params;
    if (!codeId) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios (codeId).',
        params: req.params
      });
    }

    const sew_pattern = await models.sew_pattern_code.findOne({
      where: { sew_pattern_id: codeId },
      include: [
        {
          model: models.sew_patterns
        }
      ]
    });

    if (!sew_pattern) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró este patrón.'
      });
    }

    return res.status(200).json({
      success: true,
      sew_pattern
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  }
};

const allPatterns = async (req, res) => {/*
  try {
    const { authorization } = req.headers;
    const decoded = jwtDecode(authorization);

    if (decoded.profile !== 1) {
      return res.status(400).json({
        success: false,
        message: 'No estas autorizado'
      });
    }

    const kit1Count = await models.GLS.count({
      where: { kit: { [Op.ne]: null } }
    });

    const kit2Count = await models.GLS.count({
      where: { meal: { [Op.ne]: null } }
    });

    const attendance1Count = await models.GLS.count({
      where: { attendance1: { [Op.ne]: null } }
    });

    const attendance2Count = await models.GLS.count({
      where: { attendance2: { [Op.ne]: null } }
    });

    const attendance3Count = await models.GLS.count({
      where: { attendance3: { [Op.ne]: null } }
    });

    const attendance4Count = await models.GLS.count({
      where: { attendance4: { [Op.ne]: null } }
    });

    const GLSAttendants = await models.Guest.findAll({
      include: [
        {
          model: models.GLS
        }
      ],
      order: [['name', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      GLSAttendants,
      counts: {
        kit1Count,
        kit2Count,
        attendance1Count,
        attendance2Count,
        attendance3Count,
        attendance4Count
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  }*/
};

const deletePattern = async (req, res) => {/*
  const { guestId } = req.body;
  try {
    const { authorization } = req.headers;
    const decoded = jwtDecode(authorization);

    if (decoded.profile !== 1) {
      res.status(401).json({
        success: false,
        message: 'No esta autorizado para eliminar una inscripción.'
      });
    }

    const GLSAttendant = await models.GLS.destroy({
      where: { guest_id: guestId }
    });

    const guest = await models.Guest.findOne({
      where: { id: guestId },
      include: [
        {
          model: models.GLS
        }
      ]
    });

    if (GLSAttendant) {
      return res.status(200).json({
        success: true,
        message: `Inscripción eliminada con éxito`,
        guest
      });
    } else {
      return res.status(404).send('Ese asistente no existe');
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  }*/
};

const createPattern = async (req, res) => {
  try {
    const { url, title, description, expiration } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message:
          'Los campos son obligatorios (url).',
        body: req.body
      });
    }

    const { authorization } = req.headers;
    const decoded = jwtDecode(authorization);

    if (decoded.profile !== 1) {
      return res.status(400).json({
        success: false,
        message: 'No tiene los privilegios para crear un patrón.'
      });
    }

    let pattern = await models.sew_patterns.create({
      url, title, description, expiration
    });

    return res.status(201).json({
      success: true,
      message:
        'Patrón creado satisfactoriamente',
      pattern
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  }
};
module.exports = {
  getPattern,
  createPattern,
  allPatterns,
  deletePattern
};
