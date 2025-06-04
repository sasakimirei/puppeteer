import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // URL of the image
    const imageUrl = "https://sakurazaka46.com/files/14/diary/s46/blog/moblog/202505/mobbVLZfT.jpg";

    // Navigate to the image URL
    await page.goto(imageUrl, { waitUntil: "networkidle2" });

    // Get the image source
    const imgSrc = await page.evaluate(() => {
      const img = document.querySelector("img");
      return img ? img.src : null;
    });

    if (!imgSrc) {
      console.error("Image not found on the page");
      await browser.close();
      return;
    }

    // Download the image
    const fileName = path.basename(imageUrl);
    const filePath = path.join(__dirname, fileName);
    const file = fs.createWriteStream(filePath);

    https
      .get(imageUrl, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`Image downloaded as ${fileName}`);
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => console.error("Error downloading image:", err));
      });

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error("Error:", error);
  }
})();
