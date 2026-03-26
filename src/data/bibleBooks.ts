// Estrutura completa dos 66 livros da Bíblia com seus capítulos
// Os IDs usam os slugs aceitos pela bible-api.com com translation=almeida
export interface BibleBook {
  id: string;       // slug para a API (nome em português/inglês aceito pela bible-api.com)
  name: string;     // nome em português
  abbrev: string;   // abreviação
  testament: "AT" | "NT";
  chapters: number;
}

export const BIBLE_BOOKS: BibleBook[] = [
  // ── Antigo Testamento ─────────────────────────────────────────────
  { id: "genesis",         name: "Gênesis",          abbrev: "Gn",   testament: "AT", chapters: 50  },
  { id: "exodus",          name: "Êxodo",             abbrev: "Ex",   testament: "AT", chapters: 40  },
  { id: "leviticus",       name: "Levítico",          abbrev: "Lv",   testament: "AT", chapters: 27  },
  { id: "numbers",         name: "Números",           abbrev: "Nm",   testament: "AT", chapters: 36  },
  { id: "deuteronomy",     name: "Deuteronômio",      abbrev: "Dt",   testament: "AT", chapters: 34  },
  { id: "joshua",          name: "Josué",             abbrev: "Js",   testament: "AT", chapters: 24  },
  { id: "judges",          name: "Juízes",            abbrev: "Jz",   testament: "AT", chapters: 21  },
  { id: "ruth",            name: "Rute",              abbrev: "Rt",   testament: "AT", chapters: 4   },
  { id: "1 samuel",        name: "1 Samuel",          abbrev: "1Sm",  testament: "AT", chapters: 31  },
  { id: "2 samuel",        name: "2 Samuel",          abbrev: "2Sm",  testament: "AT", chapters: 24  },
  { id: "1 kings",         name: "1 Reis",            abbrev: "1Rs",  testament: "AT", chapters: 22  },
  { id: "2 kings",         name: "2 Reis",            abbrev: "2Rs",  testament: "AT", chapters: 25  },
  { id: "1 chronicles",    name: "1 Crônicas",        abbrev: "1Cr",  testament: "AT", chapters: 29  },
  { id: "2 chronicles",    name: "2 Crônicas",        abbrev: "2Cr",  testament: "AT", chapters: 36  },
  { id: "ezra",            name: "Esdras",            abbrev: "Ed",   testament: "AT", chapters: 10  },
  { id: "nehemiah",        name: "Neemias",           abbrev: "Ne",   testament: "AT", chapters: 13  },
  { id: "esther",          name: "Ester",             abbrev: "Et",   testament: "AT", chapters: 10  },
  { id: "job",             name: "Jó",                abbrev: "Jó",   testament: "AT", chapters: 42  },
  { id: "salmos",          name: "Salmos",            abbrev: "Sl",   testament: "AT", chapters: 150 },
  { id: "proverbs",        name: "Provérbios",        abbrev: "Pv",   testament: "AT", chapters: 31  },
  { id: "ecclesiastes",    name: "Eclesiastes",       abbrev: "Ec",   testament: "AT", chapters: 12  },
  { id: "song of solomon", name: "Cânticos",          abbrev: "Ct",   testament: "AT", chapters: 8   },
  { id: "isaiah",          name: "Isaías",            abbrev: "Is",   testament: "AT", chapters: 66  },
  { id: "jeremiah",        name: "Jeremias",          abbrev: "Jr",   testament: "AT", chapters: 52  },
  { id: "lamentations",    name: "Lamentações",       abbrev: "Lm",   testament: "AT", chapters: 5   },
  { id: "ezekiel",         name: "Ezequiel",          abbrev: "Ez",   testament: "AT", chapters: 48  },
  { id: "daniel",          name: "Daniel",            abbrev: "Dn",   testament: "AT", chapters: 12  },
  { id: "hoseas",          name: "Oseias",            abbrev: "Os",   testament: "AT", chapters: 14  },
  { id: "joel",            name: "Joel",              abbrev: "Jl",   testament: "AT", chapters: 3   },
  { id: "amos",            name: "Amós",              abbrev: "Am",   testament: "AT", chapters: 9   },
  { id: "obadiah",         name: "Obadias",           abbrev: "Ob",   testament: "AT", chapters: 1   },
  { id: "jonah",           name: "Jonas",             abbrev: "Jn",   testament: "AT", chapters: 4   },
  { id: "micah",           name: "Miquéias",          abbrev: "Mq",   testament: "AT", chapters: 7   },
  { id: "nahum",           name: "Naum",              abbrev: "Na",   testament: "AT", chapters: 3   },
  { id: "habakkuk",        name: "Habacuque",         abbrev: "Hc",   testament: "AT", chapters: 3   },
  { id: "zephaniah",       name: "Sofonias",          abbrev: "Sf",   testament: "AT", chapters: 3   },
  { id: "haggai",          name: "Ageu",              abbrev: "Ag",   testament: "AT", chapters: 2   },
  { id: "zechariah",       name: "Zacarias",          abbrev: "Zc",   testament: "AT", chapters: 14  },
  { id: "malachi",         name: "Malaquias",         abbrev: "Ml",   testament: "AT", chapters: 4   },
  // ── Novo Testamento ───────────────────────────────────────────────
  { id: "matthew",         name: "Mateus",            abbrev: "Mt",   testament: "NT", chapters: 28  },
  { id: "mark",            name: "Marcos",            abbrev: "Mc",   testament: "NT", chapters: 16  },
  { id: "luke",            name: "Lucas",             abbrev: "Lc",   testament: "NT", chapters: 24  },
  { id: "joao",            name: "João",              abbrev: "Jo",   testament: "NT", chapters: 21  },
  { id: "acts",            name: "Atos",              abbrev: "At",   testament: "NT", chapters: 28  },
  { id: "romans",          name: "Romanos",           abbrev: "Rm",   testament: "NT", chapters: 16  },
  { id: "1 corinthians",   name: "1 Coríntios",       abbrev: "1Co",  testament: "NT", chapters: 16  },
  { id: "2 corinthians",   name: "2 Coríntios",       abbrev: "2Co",  testament: "NT", chapters: 13  },
  { id: "galatians",       name: "Gálatas",           abbrev: "Gl",   testament: "NT", chapters: 6   },
  { id: "ephesians",       name: "Efésios",           abbrev: "Ef",   testament: "NT", chapters: 6   },
  { id: "philippians",     name: "Filipenses",        abbrev: "Fp",   testament: "NT", chapters: 4   },
  { id: "colossians",      name: "Colossenses",       abbrev: "Cl",   testament: "NT", chapters: 4   },
  { id: "1 thessalonians", name: "1 Tessalonicenses", abbrev: "1Ts",  testament: "NT", chapters: 5   },
  { id: "2 thessalonians", name: "2 Tessalonicenses", abbrev: "2Ts",  testament: "NT", chapters: 3   },
  { id: "1 timothy",       name: "1 Timóteo",         abbrev: "1Tm",  testament: "NT", chapters: 6   },
  { id: "2 timothy",       name: "2 Timóteo",         abbrev: "2Tm",  testament: "NT", chapters: 4   },
  { id: "titus",           name: "Tito",              abbrev: "Tt",   testament: "NT", chapters: 3   },
  { id: "philemon",        name: "Filemom",           abbrev: "Fm",   testament: "NT", chapters: 1   },
  { id: "hebrews",         name: "Hebreus",           abbrev: "Hb",   testament: "NT", chapters: 13  },
  { id: "james",           name: "Tiago",             abbrev: "Tg",   testament: "NT", chapters: 5   },
  { id: "1 peter",         name: "1 Pedro",           abbrev: "1Pe",  testament: "NT", chapters: 5   },
  { id: "2 peter",         name: "2 Pedro",           abbrev: "2Pe",  testament: "NT", chapters: 3   },
  { id: "1 john",          name: "1 João",            abbrev: "1Jo",  testament: "NT", chapters: 5   },
  { id: "2 john",          name: "2 João",            abbrev: "2Jo",  testament: "NT", chapters: 1   },
  { id: "3 john",          name: "3 João",            abbrev: "3Jo",  testament: "NT", chapters: 1   },
  { id: "jude",            name: "Judas",             abbrev: "Jd",   testament: "NT", chapters: 1   },
  { id: "apocalipse",      name: "Apocalipse",        abbrev: "Ap",   testament: "NT", chapters: 22  },
];

export const AT_BOOKS = BIBLE_BOOKS.filter((b) => b.testament === "AT");
export const NT_BOOKS = BIBLE_BOOKS.filter((b) => b.testament === "NT");
