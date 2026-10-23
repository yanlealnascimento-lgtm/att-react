# Vaquinha do Helicóptero

Aplicação React responsiva feita para a atividade de ReactJs (Engenharia de Software — UCSAL).

É um *clicker*: você clica na moeda para pedir Pix numa vaquinha que junta dinheiro para comprar
uma placa de vídeo para o Helicóptero (apelido de um amigo). Com o dinheiro, compra placas e
tranqueiras de setup na loja, e a vaquinha sobe de meta conforme o total arrecadado cresce.
Vaquinha, vendedores e itens são fictícios.

## Como rodar no GitHub Codespaces

```bash
npm install
npm run dev
```

O Codespaces detecta a porta 5173 e abre o preview automaticamente. Se não abrir, vá na aba
**Ports** e clique no cadeado/globo da porta 5173.

## Estrutura

```
src/
├── App.jsx                     componente principal, orquestra os demais
├── components/
│   ├── Abas.jsx                componente 4 — Abas
│   ├── Acordeao.jsx            componente 1 — Acordeão
│   ├── BarraProgresso.jsx      componente 3 — Barra de Progresso
│   ├── MenuSuspenso.jsx        componente 5 — Menu Suspenso
│   ├── Paginacao.jsx           componente 2 — Paginação
│   ├── Toast.jsx               componente 6 — Notificação Toast
│   ├── PainelCampanha.jsx      conteúdo da aba Vaquinha
│   └── PainelComite.jsx        conteúdo da aba Loja (usa a Paginação)
├── context/
│   ├── CampanhaContext.jsx     estado global do jogo (desafio extra)
│   └── ToastContext.jsx        fila global de notificações (desafio extra)
└── data/                       conteúdo fictício (metas em cargos.js, itens da loja, regras)
```

## Onde cada requisito foi atendido

| Requisito | Onde |
|---|---|
| Acordeão | `Acordeao.jsx` — um item aberto por vez, transição de `max-height` |
| Paginação | `Paginacao.jsx` — 20 itens, 5 por página, botões desabilitados nos extremos |
| Barra de Progresso | `BarraProgresso.jsx` — progresso até a próxima meta da vaquinha, com percentual |
| Abas | `Abas.jsx` — Vaquinha / Loja / Regras |
| Menu Suspenso | `MenuSuspenso.jsx` — escolhe o vendedor da placa, fecha ao clicar fora e com `Esc` |
| Toast | `Toast.jsx` + `ToastContext.jsx` — tipos sucesso, erro e info, some em 3s |
| `useState` | em todos os componentes acima |
| `useEffect` | mineração automática (R$ por segundo), auto-fechar do toast, clique fora do menu |
| `useMemo` / `useCallback` / `useRef` | `CampanhaContext.jsx` |
| Props | `Acordeao`, `Paginacao`, `BarraProgresso`, `Abas` e `MenuSuspenso` recebem dados e callbacks |
| Manipulação de eventos | clique na moeda, compra de itens, navegação de páginas |
| Estado global (desafio extra) | Context API em `context/` |
| Acessibilidade | `role="tablist"`, `role="progressbar"`, `aria-expanded`, `aria-current`, `aria-live` |
| Responsividade | `clamp()`, grid com `auto-fit`, media queries em 520px e 480px |

## Roteiro sugerido para o vídeo

1. **Abrir a aplicação** e clicar algumas vezes na moeda — mostra estado (`useState`) mudando na tela.
2. **Barra de progresso** enchendo conforme os reais sobem; ao bater a meta, o **toast** anuncia a nova meta da vaquinha.
3. **Aba Loja** — comprar um item (toast de sucesso) e tentar comprar um caro (toast de erro).
4. **Paginação** — navegar entre as 4 páginas, mostrar botão anterior desabilitado na página 1.
5. **Menu suspenso** — trocar o vendedor (Thiago, Charles tatuador ou Vitinho), mostrar que fecha ao clicar fora.
6. **Aba Regras** — abrir e fechar itens do acordeão.
7. **Responsividade** — abrir o DevTools e alternar entre mobile, tablet e desktop.
8. **Código** — percorrer `App.jsx`, um componente de `components/` e o `CampanhaContext.jsx`,
   explicando props, estado e o Context API.
