import { NextRequest, NextResponse } from "next/server";

import { promises as fs } from "fs";

import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const uploadedFiles = formData.getAll("filepond");

    let fileName = "",
        parsedText = "";

    if (uploadedFiles && uploadedFiles.length > 0) {
        const uploadedFile = uploadedFiles[1]; // Use the first uploaded file

        if (uploadedFile instanceof Blob) {
            console.log("Uploaded file is of type Blob");

            // Generate a unique filename
            fileName = uuidv4();

            // Convert the uploaded file into a temporary file
            const tempFilePath = `/tmp/${fileName}.pdf`;

            // Convert Blob to Buffer
            const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

            // Save the buffer as a file
            await fs.writeFile(tempFilePath, fileBuffer);

            // Create a new Promise for parsing
            const pdfParser = new (PDFParser as any)(null, 1);

            const parsingPromise = new Promise((resolve, reject) => {
                console.log("In the promise");

                pdfParser.on("pdfParser_dataError", (errData: any) => {
                    console.error(errData.parserError);

                    reject(errData.parserError); // Reject the promise on error
                });

                pdfParser.on("pdfParser_dataReady", () => {
                    parsedText = pdfParser.getRawTextContent();

                    console.log("Parsed Text:", parsedText);

                    resolve(parsedText); // Resolve the promise with parsed text
                });
            });

            // Load and parse the PDF
            await pdfParser.loadPDF(tempFilePath);

            await parsingPromise; // Wait for the parsing to complete
        } else {
            console.log("Uploaded file is not in the expected format.");
            return NextResponse.json({ error: "Invalid file format." });
        }
    } else {
        console.log("No files found.");
        return NextResponse.json({ error: "No files uploaded." });
    }

    console.log("Parsed Text Ready");
    return NextResponse.json({ parsedText, fileName });
}
