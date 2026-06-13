const fs = require('fs');
const path = require('path');

const mappings = {
  '/images/saude_familia.png': [
    'plano-de-saude', 'plano-de-saude-empresarial', 'plano-por-adesao', 'plano-odontologico'
  ],
  '/images/seguro_auto.png': [
    'seguro-auto', 'seguro-motos', 'seguro-caminhoes', 'seguro-frota'
  ],
  '/images/seguro_residencial.png': [
    'seguro-residencial', 'seguro-condominio', 'seguro-fianca', 'seguro-celular-notebook', 'seguro-equipamentos-fotograficos'
  ],
  '/images/seguro_empresarial.png': [
    'seguro-empresarial', 'seguro-riscos-engenharia', 'seguro-rc-ambiental', 'seguro-rc-profissional', 
    'seguro-rc-do', 'seguro-rc-geral', 'seguro-rc-obras', 'seguro-rc-eventos', 'seguro-instalacao-montagem', 
    'seguro-maquinas-equipamentos', 'seguro-transportes', 'seguro-agricola', 'seguro-aeronautico', 
    'seguro-maritimo', 'seguro-garantia', 'seguro-garantia-judicial', 'seguro-sucessao-empresarial', 
    'seguro-vida-em-grupo', 'seguro-riscos-ciberneticos'
  ],
  '/images/seguro_vida.png': [
    'seguro-de-vida', 'seguro-acidentes-pessoais', 'seguro-prestamista', 'seguro-viagem', 
    'seguro-doencas-graves', 'seguro-educacional', 'seguro-dit'
  ],
  '/images/investimentos.png': [
    'investimentos', 'consorcios', 'previdencia-privada', 'capitalizacao'
  ]
};

const appDir = path.join(process.cwd(), 'src', 'app');

for (const [img, folders] of Object.entries(mappings)) {
  for (const folder of folders) {
    const pagePath = path.join(appDir, folder, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Update if using ProductLandingPage
      if (content.includes('<ProductLandingPage')) {
        if (!content.includes('imageUrl=')) {
          content = content.replace(
            /iconSvg=\{icon\}/g,
            `iconSvg={icon}\\n      imageUrl="${img}"`
          );
        }
      } 
      // Update if using HeroSection directly
      else if (content.includes('<HeroSection')) {
        if (!content.includes('imageUrl=')) {
          content = content.replace(
            /iconSvg=\{icon\}/g,
            `iconSvg={icon}\\n        imageUrl="${img}"`
          );
        }
      }
      
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`Updated ${folder} with ${img}`);
    } else {
      console.log(`Page not found for ${folder}`);
    }
  }
}
