// export const messages = [
//   {
//     id: "msg-1",
//     timestamp: "2025-02-17 09:00:00",
//     userPrompt:
//       "Hi! I have this long business proposal I need to analyze. The market for renewable energy solutions has been growing exponentially in recent years, particularly in developing nations. Our company, GreenTech Solutions, proposes to implement solar and wind hybrid systems in rural communities across Southeast Asia. Initial projections suggest we can reach 100,000 households within the first year of operations.",
//     detectedLanguage: "",
//     summarizedText: { content: "", timestamp: "" },
//     translatedText: { content: "", timestamp: "", targetLanguage: "" },
//   },
//   {
//     id: "msg-2",
//     timestamp: "2025-02-17 09:00:05",
//     userPrompt: "Hi! I have this long business proposal I need to analyze...",
//     detectedLanguage: "en",
//     summarizedText: { content: "", timestamp: "" },
//     translatedText: { content: "", timestamp: "", targetLanguage: "" },
//   },
//   {
//     id: "msg-3",
//     timestamp: "2025-02-17 09:05:00",
//     userPrompt:
//       "Can you provide a concise summary of the business proposal? I need to present this to my team in 5 minutes.",
//     detectedLanguage: "en",
//     summarizedText: {
//       content:
//         "Summary: GreenTech Solutions proposes implementing hybrid solar/wind systems in Southeast Asian rural communities, targeting 100k households in year one. Focus on renewable energy in developing markets with exponential growth potential.",
//       timestamp: "2025-02-17 09:06:00",
//     },
//     translatedText: { content: "", timestamp: "", targetLanguage: "" },
//   },
//   {
//     id: "msg-4",
//     timestamp: "2025-02-17 09:07:00",
//     userPrompt:
//       "I need to analyze the latest clinical trial results for our new diabetes medication. The Phase III trial included 2,500 participants across 12 countries, with a treatment duration of 48 weeks. Primary endpoints showed a significant reduction in HbA1c levels (p<0.001) compared to standard of care. Secondary endpoints demonstrated improved insulin sensitivity and reduced fasting plasma glucose. Adverse events were reported in 12% of participants, primarily mild gastrointestinal symptoms. The data suggests superior efficacy compared to existing treatments, with a favorable safety profile.",
//     detectedLanguage: "en",
//     summarizedText: {
//       content:
//         "Summary: Phase III trial of new diabetes drug (n=2,500, 48 weeks) showed significant HbA1c reduction vs standard care. Improved insulin sensitivity and reduced fasting glucose observed. 12% reported mild side effects. Superior efficacy with good safety profile.",
//       timestamp: "2025-02-17 09:07:30",
//     },
//     translatedText: { content: "", timestamp: "", targetLanguage: "" },
//   },
//   {
//     id: "msg-5",
//     timestamp: "2025-02-17 09:10:00",
//     userPrompt:
//       "Could you translate the clinical trial summary to Spanish? We need to share this with our research team in Madrid.",
//     detectedLanguage: "en",
//     summarizedText: { content: "", timestamp: "" },
//     translatedText: {
//       content:
//         "Traducción: El ensayo de fase III del nuevo medicamento para la diabetes (n=2.500, 48 semanas) mostró una reducción significativa de HbA1c en comparación con el tratamiento estándar. Se observó una mejora en la sensibilidad a la insulina y una reducción de la glucosa en ayunas. El 12% reportó efectos secundarios leves. Eficacia superior con buen perfil de seguridad.",
//       timestamp: "2025-02-17 09:11:00",
//       targetLanguage: "es",
//     },
//   },
//   {
//     id: "msg-6",
//     timestamp: "2025-02-17 09:15:00",
//     userPrompt:
//       "I'm reviewing a technical document about our new machine learning model architecture. The transformer-based model utilizes multi-head attention mechanisms with 12 layers and 768-dimensional embeddings. Pre-training was conducted on a diverse dataset of 50M examples, achieving state-of-the-art performance on multiple downstream tasks including sentiment analysis (96.2% accuracy) and named entity recognition (F1 score: 0.89).",
//     detectedLanguage: "en",
//     summarizedText: {
//       content:
//         "Summary: Advanced transformer model with 12 layers and 768D embeddings, pre-trained on 50M examples. Achieves SOTA results: 96.2% accuracy in sentiment analysis, 0.89 F1 score in NER.",
//       timestamp: "2025-02-17 09:15:30",
//     },
//     translatedText: { content: "", timestamp: "", targetLanguage: "" },
//   },
//   {
//     id: "msg-7",
//     timestamp: "2025-02-17 09:20:00",
//     userPrompt:
//       "需要将这份机器学习模型报告翻译成中文。我们的中国团队需要审查这些结果。",
//     detectedLanguage: "zh",
//     summarizedText: { content: "", timestamp: "" },
//     translatedText: {
//       content:
//         "Translation: Need to translate this machine learning model report to Chinese. Our team in China needs to review these results.",
//       timestamp: "2025-02-17 09:20:05",
//       targetLanguage: "en",
//     },
//   },
//   {
//     id: "msg-8",
//     timestamp: "2025-02-17 09:25:00",
//     userPrompt:
//       "Here's a customer review we received: The new app interface is incredibly intuitive and user-friendly. I especially love the dark mode feature and how seamlessly it integrates with my calendar. However, I've noticed some lag when loading large attachments, and the search function could be more refined. Despite these minor issues, it's a solid 4.5/5 stars from me!",
//     detectedLanguage: "en",
//     summarizedText: {
//       content:
//         "Summary: Positive review (4.5/5) praising UI and dark mode. Notes minor issues with attachment loading and search functionality. Overall satisfied with the app.",
//       timestamp: "2025-02-17 09:25:30",
//     },
//     translatedText: { content: "", timestamp: "", targetLanguage: "" },
//   },
//   {
//     id: "msg-9",
//     timestamp: "2025-02-17 09:30:00",
//     userPrompt:
//       "Analysons les résultats financiers du quatrième trimestre. Le chiffre d'affaires a augmenté de 15% par rapport à l'année précédente, atteignant 25,3 millions d'euros. Les marges d'exploitation se sont améliorées de 3 points, passant à 22%. Les investissements en R&D ont représenté 8% du chiffre d'affaires.",
//     detectedLanguage: "fr",
//     summarizedText: {
//       content:
//         "Summary: Q4 revenue up 15% YoY to €25.3M. Operating margins improved by 3 points to 22%. R&D investment at 8% of revenue.",
//       timestamp: "2025-02-17 09:30:30",
//     },
//     translatedText: {
//       content:
//         "Translation: Let's analyze the Q4 financial results. Revenue increased 15% compared to previous year, reaching €25.3M. Operating margins improved by 3 points to 22%. R&D investments represented 8% of revenue.",
//       timestamp: "2025-02-17 09:30:35",
//       targetLanguage: "en",
//     },
//   },
// ];
