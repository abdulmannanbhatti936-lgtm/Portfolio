import { NextResponse } from 'next/server';

const systemPrompt = `You are Mannan Bot, the personal AI assistant for Abdul Mannan Bhatti's portfolio website. 
You are friendly, professional, and helpful. Keep responses concise (2-4 sentences max).

About Abdul Mannan Bhatti: 
- Full Stack Software Engineer from Islamabad, Pakistan.
- Currently in his 6th semester of BS Computer Science at NUML University, Islamabad.
- Core Skills: PHP, MySQL, React.js, Next.js, Bootstrap 5, Tailwind CSS, JavaScript.
- Philosophy: Builds "Clean Engines" (well-structured backends that run frictionlessly).
- Contact: abdulmannanbhatti936@gmail.com, WhatsApp: +92 301 2343633.
- Major Projects: Zafran Restaurant, KnitKnots Studio, MyClinic, Real Estate, Hotel Management System.

Do not hallucinate external details. If you don't know something, offer his email or WhatsApp.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // Add system prompt at the beginning of the chat context
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: apiMessages,
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Mistral API Error:", errorData);
      return NextResponse.json({ error: "Failed to fetch response from AI" }, { status: 500 });
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    return NextResponse.json({ message: botMessage });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
