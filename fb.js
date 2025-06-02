import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  // const browser = await puppeteer.launch({
  //   headless: false, // non-headless
  //   defaultViewport: null,
  //   args: ["--start-maximized"],
  //   executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  // });
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  // Navigate to Facebook login
  await page.goto("https://manage.travel.rakuten.co.jp/portal/inn/mp_group.main", { waitUntil: "networkidle2" });

  // Wait for the input to be available
  await page.waitForSelector('input[name="f_id"]');

  // Type into the input field
  await page.type('input[name="f_id"]', "prh", { delay: 300 }); // Replace with your desired value
  await page.type('input[name="f_pass"]', "prince06", { delay: 300 }); // Replace with your desired value

  // Click the login button
  await Promise.all([page.click('input[value="ログイン"'), page.waitForNavigation({ waitUntil: "networkidle2" })]);

  await page.waitForSelector('input[value="個別施設管理画面"]');

  await page.click('input[value="個別施設管理画面"]', { delay: 300 }); // Replace with your desired value
  // console.log("Logged in!");

  await page.waitForSelector('input[name="f_name"]');
  await page.type('input[name="f_name"]', "グランドプリンスホテル大阪ベイ", { delay: 300 }); // Replace with your desired value

  await page.waitForSelector('input[value="施設検索"]');
  await page.click('input[value="施設検索"]', { delay: 1000 }); // Replace with your desired value

  await page.waitForSelector('input[value="管理トップ"]');
  await page.click('input[value="管理トップ"]', { delay: 1000 }); // Replace with your desired value

  await page.waitForSelector('img[alt="施設情報の管理"]');

  await page.click('img[alt="施設情報の管理"]', { delay: 1000 }); // Replace with your desired value

  // const img = await page.$('img[alt="施設情報の管理"]');

  // await img.click({ delay: 100 });
  // await img.evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }));

  await page.waitForSelector('form[action="mp_kanri_asp.main"]');

  await page.$eval('form[action="mp_kanri_asp.main"]', (form) => form.submit()),
    await page.waitForNavigation({ waitUntil: "networkidle2" }),
    await page.waitForSelector('input[value="編集"]');
  await page.click('input[value="編集"]', { delay: 300 }); // Replace with your desired value

  await page.waitForSelector('input[value="ページの編集"]');
  await page.click('input[value="ページの編集"]', { delay: 300 }); // Replace with your desired value

  await page.waitForSelector('input[value="STEP2へ進む"]');
  await page.click('input[value="STEP2へ進む"]', { delay: 300 }); // Replace with your desired value

  await page.waitForSelector("#custom_area");

  const textValue = await page.$eval("#custom_area", (el) => el.value);

  // console.log("Textarea value:", textValue);

  // const htmlContent = textValue;

  fs.writeFileSync("index.html", textValue, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("HTML file has been created as output.html");
    }
  });
  console.log("Data saved to index.html");
  // Keep browser open for inspection
  // await browser.close(); // Uncomment to close automatically
})();
