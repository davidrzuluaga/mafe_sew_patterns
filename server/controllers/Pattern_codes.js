const models = require('../models');
const jwtDecode = require('jwt-decode');
const { makeCode } = require('../helper');

const deletePatternCode = async (req, res) => {
  const { codeId } = req.body;
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
      where: { id: codeId }
    });

    if (sew_pattern) {
      return res.status(200).json({
        success: true,
        message: `Código de patrón eliminado con éxito`,
        sew_pattern_code
      });
    } else {
      return res.status(404).send('Ese código patrón no existe');
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  }
};

const createPatternCode = async (req, res) => {
  try {
    let { sew_pattern_id, quantity } = req.body;

    if (!sew_pattern_id || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Los campos son obligatorios ( sew_pattern_id, quantity ).',
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

    let patternsQuantity = quantity ? quantity : 1;
    let patternsValues = [];

    for (let i = 0; i < patternsQuantity; i++) {
      patternsValues = [
        ...patternsValues,
        { sew_pattern_id, code: makeCode(5) }
      ];
    }

    let patternsCodes = await models.sew_pattern_codes.bulkCreate(
      patternsValues,
      {
        returning: true
      }
    );

    return res.status(201).json({
      success: true,
      message: 'Patrónes creados satisfactoriamente',
      patternsCodes,
      patternsValues
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
  createPatternCode,
  deletePatternCode
};
