import { useState } from "react";

function App() {
  // Estados do formulário
  const [tipoProjeto, setTipoProjeto] = useState("");
  const [publico, setPublico] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(false);
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para chamar o backend
  async function gerarConteudo() {
    try {
      setLoading(true);
      const resposta = await fetch("http://127.0.0.1:8000/gerar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo_projeto: tipoProjeto,
          publico: publico,
          objetivo: objetivo,
          descricao: descricao,
          imagem: imagem,
        }),
      });

      const dados = await resposta.json();
      setResultado(dados.texto);
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      setResultado("Ocorreu um erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 bg-[length:400%_400%] animate-gradient-x">
      
      <div className="w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] text-center tracking-tight">
          Gerador de Conteúdo IA
        </h1>

        {/* Formulário */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-purple-500/20 p-8 md:p-10 rounded-3xl w-full space-y-5 shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] hover:border-purple-500/40">
          
          <div className="relative group">
            <select
              className="w-full p-4 rounded-2xl bg-slate-950/50 border border-slate-700/50 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none"
              onChange={(e) => setTipoProjeto(e.target.value)}
            >
              <option value="" className="bg-slate-900">Tipo de projeto</option>
              <option value="Tecnologia" className="bg-slate-900">Tecnologia</option>
              <option value="Imobiliario" className="bg-slate-900">Imobiliário</option>
              <option value="Automobilistico" className="bg-slate-900">Automobilístico</option>
              <option value="Comercio" className="bg-slate-900">Comércio</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Público alvo"
            className="w-full p-4 rounded-2xl bg-slate-950/50 border border-slate-700/50 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
            onChange={(e) => setPublico(e.target.value)}
          />

          <input
            type="text"
            placeholder="Objetivo do conteúdo"
            className="w-full p-4 rounded-2xl bg-slate-950/50 border border-slate-700/50 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
            onChange={(e) => setObjetivo(e.target.value)}
          />

          <textarea
            placeholder="Descrição adicional"
            className="w-full p-4 rounded-2xl bg-slate-950/50 border border-slate-700/50 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all min-h-[120px] resize-y placeholder:text-slate-500"
            onChange={(e) => setDescricao(e.target.value)}
          />

          <div className="flex items-center gap-3 py-2">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={(e) => setImagem(e.target.checked)}
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500 shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
              <span className="ml-3 text-sm font-medium text-slate-300">Gerar imagem também</span>
            </label>
          </div>

          <button
            onClick={gerarConteudo}
            disabled={loading}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gerando...
                </>
              ) : "Gerar conteúdo"}
            </span>
          </button>
        </div>

        {/* Exibição do Resultado */}
        {resultado && (
          <div className="mt-8 bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl w-full border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.15)] animate-[fadeIn_0.5s_ease-out]">
            <h2 className="text-2xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,1)]"></span>
              Resposta da IA
            </h2>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
              {resultado}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;