const express = require('express');
const router = express.Router();
const guardianController = require('../controllers/guardianController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, guardianController.createGuardian);
router.get('/get-all', authMiddleware, guardianController.getAllGuardians);
router.get('/get-by-id/:id', authMiddleware, guardianController.getGuardianById);
router.put('/update/:id', authMiddleware, guardianController.updateGuardian);
router.delete('/delete/:id', authMiddleware, guardianController.deleteGuardian);
router.get('/get-by-cnic/:cnic', authMiddleware, guardianController.getGuardianByCnic);

module.exports = router;
