from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import os

# carregar variáveis do .env
load_dotenv()

# iniciar API
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permitir o frontend dev na mesma máquina
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# chave da API
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# modelo de dados recebido do frontend
class DadosProjeto(BaseModel):
    tipo_projeto: str
    publico: str
    objetivo: str
    descricao: str
    imagem: bool


# endpoint principal
@app.post("/gerar")
def gerar(dados: DadosProjeto):

    # prompt para geração de texto
    prompt_txt = f"""
Crie um conteúdo para reels do instagram com:

- Gancho
- Roteiro
- Sugestões de edição

Baseado nas seguintes informações:

Tipo de projeto: {dados.tipo_projeto}
Publico alvo: {dados.publico}
Objetivo: {dados.objetivo}

Descrição adicional do cliente:
{dados.descricao}
"""

    # prompt para geração de imagem
    prompt_imagem = f"""
Crie uma imagem profissional baseada nas seguintes informações:

Tipo de projeto: {dados.tipo_projeto}
Público alvo: {dados.publico}

Descrição visual:
{dados.descricao}
"""

    # gerar texto
    resposta_texto = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt_txt
    )

    texto_resposta = resposta_texto.text

    imagem_resposta = None

    # gerar imagem apenas se usuário pedir
    if dados.imagem:
        resposta_imagem = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"Descreva uma imagem profissional baseada nisso: {prompt_imagem}"
        )


        imagem_resposta = resposta_imagem.candidates[0].content.parts[0]

    return {
        "texto": texto_resposta,
        "imagem": imagem_resposta
    }



