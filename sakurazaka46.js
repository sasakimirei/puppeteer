import puppeteer from "puppeteer";
import fs from "fs";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = `https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000`;

  await page.goto(url);

  // const title = await page.title();
  // console.log(`Page title`, title);

  const idols = await page.evaluate(() => {
    const idolsInfo = document.querySelectorAll(".com-blog-part.box4 .box");
    return Array.from(idolsInfo).map((idol) => {
      const name = idol.querySelector(".name").textContent;
      const image = idol.querySelector("span.img").getAttribute("style");
      return { name, image };
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
