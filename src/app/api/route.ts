import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        // Parse request body as JSON
        const data = await request.json();
        console.log("route.ts----data---", data);

        // Make fetch request with appropriate headers and body
        const uploadResponse = await fetch(`http://localhost:3000/filter-by-keywords`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data), // Convert data back to JSON string
        });

        // Return the response from the backend API
        return uploadResponse;

      } catch (error) {
        console.error('Error searching:', error);
        // Return an error response if there's a problem
        return NextResponse.json({ error: 'Error searching files' }, { status: 500 });
      }
};


// export const revalidate = 0;