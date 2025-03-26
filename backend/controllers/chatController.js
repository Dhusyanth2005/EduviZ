const { model } = require('../services/geminiService');

let preloadedData = null;

const preloadData = (req, res) => {
  preloadedData = req.body.data;
  res.json({ message: 'Data preloaded successfully!' });
};

const chat = async (req, res) => {
  const userMessage = req.body.message;

  if (!preloadedData) {
    return res.json({ reply: 'No data preloaded yet! Select a part first.' });
  }

  try {
    const prompt = `
      You’re an educational AI assistant designed for students learning about engineering and materials science. The user asked: "${userMessage}". Respond based on this context: The ${preloadedData.item} is made by ${preloadedData.details} and crafted with ${preloadedData.materials}. Provide a detailed, study-based response in a point-by-point format using emojis to make it engaging. Each point should teach something valuable about the part, its manufacturing, materials, or usage in a bicycle. Keep the tone conversational and encouraging for learning!

      Format your response as HTML with proper line breaks and tags, like this:
      <p>🧠 <strong>Key Fact</strong>: [Educational fact about the part]</p>
      <p>🔧 <strong>How It’s Made</strong>: [A step or detail about manufacturing]</p>
      <p>🛠️ <strong>Material Spotlight</strong>: [Detail about the material and why it’s used]</p>
      <p>🚴 <strong>Why It Matters</strong>: [How this part impacts the bicycle’s performance or functionality]</p>
      <p>📚 <strong>Fun Fact</strong>: [An interesting tidbit to keep the student engaged]</p>
    `;
    
    const result = await model.generateContent(prompt);
    const speech = result.response.text();
    res.json({ reply: speech });
  } catch (error) {
    console.error('Error with Generative AI:', error);
    res.json({ reply: `Whoops, I hit a snag! Let’s talk about the ${preloadedData.item}—what do you want to know?` });
  }
};

module.exports = { preloadData, chat };