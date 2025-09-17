"""
Asistente de IA básico para optimización de KPIs
Ejemplo de implementación con LangChain
"""

from langchain import OpenAI, PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from typing import Dict, Any

class KPIAssistant:
    """
    Asistente especializado en optimización de KPIs empresariales
    """
    
    def __init__(self, api_key: str = None):
        """
        Inicializa el asistente con configuración básica
        
        Args:
            api_key: Clave de API de OpenAI (opcional)
        """
        self.llm = OpenAI(
            temperature=0.7,
            openai_api_key=api_key
        )
        self.memory = ConversationBufferMemory()
        
        # Template para respuestas orientadas a KPIs
        self.prompt = PromptTemplate(
            input_variables=["user_input", "context", "kpis"],
            template="""
            Eres un asistente especializado en optimización de KPIs empresariales.
            
            Contexto de la empresa: {context}
            KPIs actuales: {kpis}
            
            Consulta del usuario: {user_input}
            
            Proporciona una respuesta que:
            1. Analice el impacto en los KPIs mencionados
            2. Sugiera acciones específicas y medibles
            3. Incluya métricas de seguimiento
            4. Sea práctica y aplicable
            
            Respuesta:
            """
        )
        
        self.chain = LLMChain(
            llm=self.llm,
            prompt=self.prompt,
            memory=self.memory
        )
    
    def process_query(self, user_input: str, context: Dict[str, Any], kpis: Dict[str, Any]) -> str:
        """
        Procesa una consulta del usuario relacionada con KPIs
        
        Args:
            user_input: Consulta del usuario
            context: Contexto de la empresa
            kpis: KPIs actuales y objetivos
            
        Returns:
            Respuesta del asistente
        """
        try:
            response = self.chain.run(
                user_input=user_input,
                context=context,
                kpis=kpis
            )
            return response
        except Exception as e:
            return f"Error procesando la consulta: {str(e)}"
    
    def get_memory_summary(self) -> str:
        """
        Obtiene un resumen de la conversación
        
        Returns:
            Resumen de la conversación
        """
        return self.memory.buffer
    
    def clear_memory(self):
        """
        Limpia el historial de conversación
        """
        self.memory.clear()

# Ejemplo de uso
if __name__ == "__main__":
    # Inicializar el asistente
    assistant = KPIAssistant()
    
    # Contexto de ejemplo
    context = {
        "industry": "SaaS",
        "company_size": "1000 empleados",
        "main_product": "Plataforma de gestión de proyectos"
    }
    
    # KPIs de ejemplo
    kpis = {
        "churn_rate": "15%",
        "target_churn_rate": "5%",
        "current_mrr": "$100,000",
        "target_mrr": "$150,000",
        "customer_satisfaction": "7.2/10"
    }
    
    # Consulta de ejemplo
    query = "¿Cómo puedo reducir el churn rate de nuestros clientes?"
    
    # Procesar la consulta
    response = assistant.process_query(query, context, kpis)
    
    print("Respuesta del asistente:")
    print(response)
