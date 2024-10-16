import mongoose from 'mongoose';
import '../models/leadModel.js'; 
import { MongoClient } from 'mongodb';

class LeadController {
    constructor() {
        // Definindo o modelo Lead como uma propriedade da classe
        this.Lead = mongoose.model('Lead');
    }

    // Método para criar um novo lead
    async createLead(req, res, attempt = 0) {
        const maxAttempts = 2; // Número máximo de tentativas
        const delay = 30000; // 30 segundos de atraso entre tentativas

        if (mongoose.connection.readyState === 1) { // Verificar se já está conectado
            try {
                // Validação simples
                const { number, email, name, subject } = req.body;
                if (!number || !email || !name || !subject) {
                    return res.status(400).send("Todos os campos são obrigatórios.");
                }

                // Cria uma nova instância de Lead
                const lead = new this.Lead({ number, email, name, subject });

                // Salva o lead no banco de dados
                await lead.save();
                console.log('Lead salvo com sucesso!');

                // Responde com sucesso
                res.status(200).send("Informações salvas com sucesso.");
            } catch (error) {
                console.error('Erro no processo de criação do lead:', error);
                res.status(500).send("Erro ao salvar as informações: " + error.message);
            }
        } else if (attempt < maxAttempts) {
            console.log(`Tentativa ${attempt + 1}: Conexão com o banco de dados não está disponível. Tentando novamente em ${delay / 1000} segundos...`);
            setTimeout(() => {
                this.createLead(req, res, attempt + 1);
            }, delay);
        } else {
            res.status(500).send("Não foi possível conectar ao banco de dados após várias tentativas.");
        }
    }

    async fetchLeads(req, res) {
        try {
            const leads = await this.Lead.find({}); // Busca todos os leads
            console.log(leads);
            res.status(200).json(leads); // Retorna os leads no formato JSON
        } catch (error) {
            console.error('Erro ao buscar leads:', error);
            res.status(500).send('Erro ao buscar leads');
        }
    }
}

export default LeadController;
                      
