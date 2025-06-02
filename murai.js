import puppeteer from "puppeteer";
import fs from "fs";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = `https://sakurazaka46.com/s/s46/diary/detail/60303?ima=0000&cd=blog`;

  await page.goto(url);

  // const title = await page.title();
  // console.log(`Page title`, title);

  const idols = await page.evaluate(() => {
    const idolsInfo = document.querySelectorAll(".post .box-article img");
    return Array.from(idolsInfo).map((idol, index) => {
      const name = idol.getAttribute("src");
      const url = "https://sakurazaka46.com/";
      const link = url + name;
      return { index, link };
    });
  });
  console.log(idols);
  // allBooks.push(...books);
  // console.log(`Books on page ${currentPage}: `, books);
  // currentPage++;
  // }

  // fs.writeFileSync("idol.json", JSON.stringify(allBooks, null, 2));
  // console.log("Data saved to books.json");

  await browser.close();
};

scrape();
