(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const searchButtons = Array.from(header.querySelectorAll("[data-site-search-open]"));
  const menuButton = header.querySelector(".site-header__toggle");
  const mobileMenu = header.querySelector("#site-mobile-menu");
  const isMac = /Mac|iPhone|iPad/i.test(navigator.platform);
  const shortcutText = isMac ? "⌘\u00A0K" : "Ctrl\u00A0K";

  header.querySelectorAll(".site-header__search-shortcut").forEach((node) => {
    node.textContent = shortcutText;
  });

  const quickLinks = [
    {
      href: "index.html#hero",
      title: "Início",
      meta: "Visão geral da BlockX e proposta principal.",
      group: "Plataforma",
      keywords: "inicio home hero landing blockx"
    },
    {
      href: "index.html#problema",
      title: "Problema do Mercado",
      meta: "Riscos da custódia tradicional e da segurança reativa.",
      group: "Plataforma",
      keywords: "problema risco ftx exchanges custodia"
    },
    {
      href: "index.html#solucao",
      title: "A Solução",
      meta: "Como a arquitetura híbrida BlockX protege ativos digitais.",
      group: "Plataforma",
      keywords: "solucao arquitetura produto plataforma"
    },
    {
      href: "index.html#autoridade",
      title: "Autoridade",
      meta: "Números, credenciais e base técnica da operação.",
      group: "Plataforma",
      keywords: "autoridade numeros credenciais equipe"
    },
    {
      href: "index.html#faq",
      title: "FAQ",
      meta: "Perguntas frequentes sobre a BlockX.",
      group: "Plataforma",
      keywords: "faq ajuda duvidas perguntas"
    },
    {
      href: "tecnologia.html#hero",
      title: "Tecnologia",
      meta: "A visão geral da stack proprietária da BlockX.",
      group: "Páginas",
      keywords: "tecnologia stack arquitetura"
    },
    {
      href: "tecnologia.html#escudo",
      title: "Escudo Pós-Quântico",
      meta: "Camada de blindagem contra ameaças quânticas.",
      group: "Tecnologia",
      keywords: "escudo pos quantico blindagem"
    },
    {
      href: "tecnologia.html#cerebro",
      title: "IA Defensiva",
      meta: "Monitoramento, detecção e resposta em tempo real.",
      group: "Tecnologia",
      keywords: "ia defensiva cerebro inteligencia"
    },
    {
      href: "early-access.html#hero",
      title: "Early Access",
      meta: "Entre para a lista antecipada da BlockX.",
      group: "Páginas",
      keywords: "early access lista espera"
    },
    {
      href: "sobre.html#hero",
      title: "Sobre Nós",
      meta: "Conheça o time, a missão e o posicionamento da empresa.",
      group: "Páginas",
      keywords: "sobre equipe empresa missao"
    },
    {
      href: "sobre.html#manifesto",
      title: "Manifesto",
      meta: "A visão da BlockX para a segurança da era pós-quântica.",
      group: "Sobre",
      keywords: "manifesto visao futuro"
    },
    {
      href: "termos-de-uso.html#hero",
      title: "Termos de Uso",
      meta: "Diretrizes de acesso, governança e responsabilidade do ecossistema BlockX.",
      group: "Legal",
      keywords: "termos uso legal juridico compliance"
    },
    {
      href: "politica-de-privacidade.html#hero",
      title: "Política de Privacidade",
      meta: "Como a BlockX coleta, utiliza, protege e compartilha dados operacionais, comerciais e técnicos.",
      group: "Legal",
      keywords: "privacidade dados policy lgpd coleta"
    }
  ];

  const palette = document.createElement("div");
  palette.className = "site-palette";
  palette.id = "site-command-palette";
  palette.hidden = true;
  palette.innerHTML = `
    <div class="site-palette__backdrop" data-site-search-close></div>
    <div class="site-palette__dialog" role="dialog" aria-modal="true" aria-labelledby="site-palette-title">
      <div class="site-palette__header">
        <p class="site-palette__title" id="site-palette-title">Navegação Rápida</p>
        <button class="site-palette__close" type="button" aria-label="Fechar busca rápida" data-site-search-close>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="site-palette__search">
        <label class="sr-only" for="site-palette-input">Buscar páginas e atalhos</label>
        <div class="site-palette__input-wrap">
          <svg class="site-palette__input-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"/>
            <path d="m16 16 4.25 4.25" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <input class="site-palette__input" id="site-palette-input" name="quick_search" type="search" autocomplete="off" spellcheck="false" placeholder="Buscar páginas, seções ou atalhos…">
        </div>
      </div>
      <div class="site-palette__results" aria-live="polite"></div>
    </div>
  `;

  document.body.appendChild(palette);

  const results = palette.querySelector(".site-palette__results");
  const input = palette.querySelector(".site-palette__input");

  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const renderResults = (query = "") => {
    const term = normalize(query.trim());
    const matches = quickLinks.filter((item) => {
      if (!term) return true;
      const haystack = normalize(`${item.title} ${item.meta} ${item.group} ${item.keywords}`);
      return haystack.includes(term);
    });

    if (!matches.length) {
      results.innerHTML = `<div class="site-palette__empty">Nenhum resultado encontrado. Tente outro termo.</div>`;
      return;
    }

    results.innerHTML = matches
      .map(
        (item) => `
          <a class="site-palette__item" href="${item.href}" data-site-search-item>
            <div class="site-palette__item-copy">
              <span class="site-palette__item-kicker">${item.group}</span>
              <span class="site-palette__item-title">${item.title}</span>
              <span class="site-palette__item-meta">${item.meta}</span>
            </div>
            <span class="site-palette__item-arrow" aria-hidden="true">↗</span>
          </a>
        `
      )
      .join("");
  };

  const openPalette = () => {
    closeMenu();
    renderResults(input.value);
    palette.hidden = false;
    document.body.classList.add("is-site-locked");
    window.requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
  };

  const closePalette = () => {
    if (palette.hidden) return;
    palette.hidden = true;
    document.body.classList.remove("is-site-locked");
  };

  const openMenu = () => {
    if (!menuButton || !mobileMenu) return;
    header.classList.add("is-menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    mobileMenu.hidden = false;
  };

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    header.classList.remove("is-menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  };

  const toggleMenu = () => {
    if (!menuButton || !mobileMenu) return;
    if (mobileMenu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  searchButtons.forEach((button) => {
    button.addEventListener("click", openPalette);
  });

  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  palette.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("[data-site-search-close], [data-site-search-item]")) {
      closePalette();
    }
  });

  input.addEventListener("input", () => {
    renderResults(input.value);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const firstResult = results.querySelector(".site-palette__item");
    if (!(firstResult instanceof HTMLAnchorElement)) return;
    event.preventDefault();
    window.location.href = firstResult.href;
  });

  document.addEventListener("keydown", (event) => {
    const wantsSearch = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
    if (wantsSearch) {
      event.preventDefault();
      if (palette.hidden) {
        openPalette();
      } else {
        closePalette();
      }
      return;
    }

    if (event.key === "Escape") {
      closePalette();
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1139) {
      closeMenu();
    }
  });
})();
