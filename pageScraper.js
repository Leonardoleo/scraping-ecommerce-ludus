const scraper = {
  url: "http://localhost:8000/product-detail.html",
  async scraper(browser) {
    let page = await browser.newPage();

    await page.goto(this.url);

    await page.waitForSelector(".map-content");

    console.log("page is loaded");

    const product = await page.evaluate(async () => {
      return {
        title: document.querySelector(".pd-detail__name").textContent,
        price: document.querySelector(".pd-detail__price").textContent,
        policyHtml: document.querySelector(".pd-detail__policy-list").innerHTML,
        videoUrl: document.querySelector("iframe").src,
      };
    });

    console.log({ product });

    const button = await page.$("#view-review");

    setTimeout(() => {
      button.click();
    }, 3000);

    const reviewElements = await page.$$(".review-o");
    const reviews = [];

    for (let i = 0; i < reviewElements.length; i++) {
      const name = await reviewElements[i].$eval(
        ".review-o__text",
        (v) => v.textContent
      );

      const text = await reviewElements[i].$eval(
        ".review-o__text",
        (v) => v.textContent
      );

      const date = await reviewElements[i].$eval(
        ".review-o__date",
        (v) => v.textContent
      );

      const ratingFromText = await reviewElements[i].$eval(
        ".review-o__rating span",
        (v) => v.textContent
      );

      const ratingFromStars = await reviewElements[i].$$(".review-o.fas");

      console.log({
        name,
        text,
        date,
        ratingFromText: parseInt(
          ratingFromText.replace("(", "").replace(")", "")
        ),
        ratingFromStars: ratingFromStars.length,
      });
    }

    // const title = await page.evaluate(async () => {
    //   return document.querySelector(".pd-detail__name").textContent;
    // });

    // console.log({ title });

    // const price = await page.evaluate(async () => {
    //   return document.querySelector(".pd-detail__price").textContent;
    // });

    // console.log({ price });
  },
};

module.exports = scraper;
