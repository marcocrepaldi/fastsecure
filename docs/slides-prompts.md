# Imagens dos slides da home — prompts para IA

Os slides da home (`src/components/BranchSlider.tsx`) usam imagens provisórias até você
salvar as definitivas em **`public/images/slides/`** com estes nomes:

| Slide | Arquivo |
|---|---|
| Seguro Auto | `auto.jpg` |
| Plano de Saúde | `saude.jpg` |
| Seguro de Vida | `vida.jpg` |
| Seguro Residencial | `residencial.jpg` |
| Para empresas | `empresas.jpg` |

Também valem `.webp` ou `.png`. Não precisa mexer no código: no próximo build o slide passa a usar a imagem nova.

## Especificações

- **Formato:** paisagem 16:9, no mínimo **2560 × 1440 px**.
- **Composição:** as pessoas ficam **nos dois terços da direita**. O terço esquerdo deve ser mais calmo
  (fundo desfocado, parede, céu), porque o texto do slide fica ali, sobre um degradê escuro.
- **Sem** texto, logotipos, marcas, placas legíveis ou marcas d'água.
- **Peso:** depois de gerar, comprima para ficar abaixo de ~400 KB (por exemplo em squoosh.app, formato WebP ou JPG 80%).

## Bloco de estilo (cole no fim de cada prompt)

```
Photorealistic editorial photography, natural warm light, shallow depth of field, shot on a 35mm lens,
authentic candid moment, genuine smiles, contemporary Brazilian setting. People positioned in the right
two-thirds of the frame, calm out-of-focus background on the left third. 16:9 landscape. No text, no logos,
no brand names, no watermarks, no readable signs.
```

## Prompts

### 1. Seguro Auto — `auto.jpg`
```
A multiracial Brazilian family on a road trip: a Black father driving, a Japanese-Brazilian mother in the
passenger seat laughing, and two mixed-race kids in the back seat, seen through the open side window of a
modern compact SUV, coastal road and green hills softly blurred in the background, golden hour.
```

### 2. Plano de Saúde — `saude.jpg`
```
A friendly Black female doctor in a white coat talking with a multiracial family in a bright modern clinic
office in São Paulo: a brown-skinned mother holding a toddler, a white father and a grandmother of
Indigenous Brazilian descent, everyone relaxed and smiling, plants and soft daylight from a large window.
```

### 3. Seguro de Vida — `vida.jpg`
```
A mixed-race Brazilian couple in their forties walking hand in hand with their teenage daughter and a
young son in a lush urban park, the father is Black, the mother is of Asian-Brazilian descent, warm late
afternoon sun through the trees, a feeling of security and togetherness.
```

### 4. Seguro Residencial — `residencial.jpg`
```
A young multiracial couple — a Black woman and a white man — sitting on the floor of their bright new
apartment living room, unpacking a moving box and laughing, a small dog beside them, modern Brazilian
apartment with plants, wooden floor and large windows with a city view softly blurred.
```

### 5. Para empresas — `empresas.jpg`
```
A diverse team of Brazilian professionals in a modern open-plan office: a Black woman leading the
conversation, a Japanese-Brazilian man and a brown-skinned woman listening and smiling around a light wood
table with laptops, glass walls and plants, natural daylight, collaborative and optimistic mood.
```

## Dicas

- Gere 3 ou 4 variações de cada e escolha as que têm rostos e mãos mais naturais.
- Confira se nenhuma imagem tem texto ou logotipo "inventado" pela IA (é comum em telas, placas e roupas).
- Mantenha a mesma luz quente em todas, para os slides parecerem uma série.
