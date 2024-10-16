import mongoose from 'mongoose';
import '../models/leadModel.js'; // Supondo que seu modelo Lead está definido aqui

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
                const { numero, email, nome } = req.body;
                if (!numero || !email || !nome) {
                    return res.status(400).send("Todos os campos são obrigatórios.");
                }

                // Cria uma nova instância de Lead
                const lead = new this.Lead({ numero, email, nome });

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
}

export default LeadController;
                      
