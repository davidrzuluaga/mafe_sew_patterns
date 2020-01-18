const models = require('../models');
const jwtDecode = require('jwt-decode');

const getPatternByCode = async (req, res) => {
  try {
    const { code } = req.params;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios (code).',
        params: req.params
      });
    }

    const sew_pattern = await models.sew_pattern_codes.findOne({
      where: { code, used: null },
      include: [
        {
          model: models.sew_patterns
        }
      ]
    });

    await models.sew_pattern_codes.update(
      { used: new Date() },
      { where: { code, used: null } }
    );

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

const updatePattern = async (req, res) => {
  try {
    const { patternId } = req.params;
    const { url, title, description } = req.body;

    if (!patternId) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios (patternId).',
        params: req.params
      });
    }

    const sew_pattern = await models.sew_patterns.update(
      { url, title, description },
      { where: { patternId } }
    );

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

const allPatterns = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const decoded = jwtDecode(authorization);

    if (decoded.profile !== 1) {
      return res.status(400).json({
        success: false,
        message: 'No estas autorizado'
      });
    }

    const sew_patterns = await models.sew_patterns.findAll({
      include: [
        {
          model: models.sew_pattern_codes
        }
      ],
      order: [['name', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      sew_patterns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  }
};

const deletePattern = async (req, res) => {
  const { patternId } = req.body;
  try {
    const { authorization } = req.headers;
    const decoded = jwtDecode(authorization);

    if (decoded.profile !== 1) {
      res.status(401).json({
        success: false,
        message: 'No esta autorizado para eliminar.'
      });
    }

    const sew_pattern_code = await models.sew_pattern_codes.destroy({
      where: { sew_pattern_id: patternId }
    });

    const sew_pattern = await models.sew_patterns.destroy({
      where: { id: patternId }
    });

    if (sew_pattern) {
      return res.status(200).json({
        success: true,
        message: `Patrón eliminado con éxito`,
        sew_pattern,
        sew_pattern_code
      });
    } else {
      return res.status(404).send('Ese patrón no existe');
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  }
};

const createPattern = async (req, res) => {
  try {
    const { url, title, description } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Los campos son obligatorios (url).',
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
      url,
      title,
      description
    });

    return res.status(201).json({
      success: true,
      message: 'Patrón creado satisfactoriamente',
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
  getPatternByCode,
  createPattern,
  allPatterns,
  updatePattern,
  deletePattern
};
