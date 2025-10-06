import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { base64Pdf: base64Image } = await req.json();

    if (!base64Image) {
      return NextResponse.json(
        { error: "No image data provided" },
        { status: 400 }
      );
    }

    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { error: "API configuration missing" },
        { status: 500 }
      );
    }

    // Initialize OpenAI client with custom baseURL
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: apiUrl,
    });

    // HERE GOES THE PROMPT
    const prompt =
      "You are an advisor that is helping a student prepare for a job interview. \
	  The image is a screenshot of the student's resume. \
	  Please analyze the resume and create a list of questions 	\
	  that the student should be prepared to answer during the interview.  \
	  Make sure you understand the words in the resume. If you don't, don't make up a question. \
	  Stick to what you understand from the resume. \
	  Return it in JSON format with the following structure: { questions: string[] }";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    // Extract questions from the response
    const content = completion.choices[0]?.message?.content || "";
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);

    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[1]);
      return NextResponse.json({ questions: parsedData.questions });
    }

    return NextResponse.json({ questions: [] });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
