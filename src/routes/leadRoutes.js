import express from 'express';

import LeadController from '../controllers/leadController.js';

const router = express.Router();
const leadController = new LeadController();

router.post('/leads', (req, res) => {
    leadController.createLead(req, res);
});

router.get('/', (req, res) => {
    res.sendfile('src/templates/index.html');
});

router.get("/leads",(req,res)=>{
    leadController.fetchLeads(req,res);
})

export default router;
