import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Mock response generator as fallback
const generateMockBrandingResponse = (message: string): string => {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('color') || lowercaseMessage.includes('palette')) {
    return "Based on your industry and target audience, I recommend a color palette with:\n\n• Primary: #3A86FF (Blue) - Represents trust and reliability\n• Secondary: #FF006E (Magenta) - Adds energy and creativity\n• Accent: #FFBE0B (Yellow) - Creates warmth and optimism\n• Neutral: #8D99AE (Gray) - Provides balance and sophistication\n\nThis combination strikes a balance between professionalism and creativity. The blue establishes credibility while the magenta adds a distinctive touch that will help your brand stand out.";
  }
  
  if (lowercaseMessage.includes('logo') || lowercaseMessage.includes('design')) {
    return "For your logo design, I recommend a minimalist approach with these key elements:\n\n• Mark: A simple geometric symbol representing your core service/product\n• Typography: A clean sans-serif font like Montserrat or Poppins for modern appeal\n• Spacing: Ensure adequate whitespace for versatility across platforms\n• Scalability: Design with both large and small applications in mind\n\nYour logo should work well in both color and monochrome versions, and should be instantly recognizable even at small sizes.";
  }
  
  if (lowercaseMessage.includes('message') || lowercaseMessage.includes('slogan') || lowercaseMessage.includes('tagline')) {
    return "For your brand messaging, focus on these key principles:\n\n• Value Proposition: \"Simplifying [industry] with innovative solutions\"\n• Tone: Confident yet approachable, expert but not condescending\n• Key Message Framework:\n  - Problem recognition\n  - Unique solution highlighting\n  - Emotional benefit emphasis\n  - Call-to-action\n\nYour messaging should consistently emphasize how you solve customer pain points while differentiating from competitors.";
  }
  
  if (lowercaseMessage.includes('strategy') || lowercaseMessage.includes('position')) {
    return "For your brand strategy, I recommend:\n\n• Market Position: Focus on the intersection of quality and innovation\n• Brand Personality: Professional, forward-thinking, and customer-centric\n• Core Values: Excellence, Integrity, Innovation, and Responsiveness\n• Differentiation: Emphasize your unique [specific feature/approach]\n\nThis positioning will help establish credibility while setting you apart from competitors who may focus solely on price or basic functionality.";
  }
  
  // Default response
  return "Thank you for your question about branding. To provide you with the most helpful guidance, could you specify which aspect you'd like to focus on?\n\n• Brand Strategy & Positioning\n• Visual Identity (Logo, Colors, Typography)\n• Messaging & Tone of Voice\n• Customer Perception & Experience\n\nThe more specific details you can share about your business, target audience, and goals, the more tailored my advice can be.";
};

export const generateBrandingResponse = async (message: string) => {
  try {
    // First try to use the OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert AI branding assistant with deep knowledge in:
- Brand Strategy & Development
- Logo Design & Visual Identity
- Color Theory & Psychology
- Marketing & Messaging
- Brand Voice & Tone
- Market Positioning
- Brand Guidelines

Provide specific, actionable advice tailored to the user's needs. Focus on practical suggestions and clear explanations. When discussing design elements, be specific about colors (use hex codes), fonts, and visual principles.`
        },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    // If the error is due to quota limits, use the mock generator instead
    if (error?.status === 429 || (error?.error && error.error.code === "insufficient_quota")) {
      console.log('Using fallback response generator due to API quota limitations');
      return generateMockBrandingResponse(message);
    }
    
    // For other errors, return a friendly error message
    return "I apologize, but I'm having trouble processing your request at the moment. This could be due to high demand or a temporary service interruption. Please try again in a few moments.";
  }
};