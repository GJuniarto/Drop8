const fs = require("fs");
const pdf = require("html-pdf");

function replaceHtml(data) {
    const html = fs.readFileSync("./data/invoice.html", "utf8");
    html.replace(
        "##price##",
        data.amount.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR"
        })
    );
    html.replace("##id##", data.id);
    html.replace("##date##", data.date);
    html.replace("##productName##", data.productName);
    html.replace("##quantity##", data.quantity);
    return html;
}

function createPdf(data, id) {
    const htmlFormated = replaceHtml(data);
    const options = { format: "Letter" };
    pdf.create(htmlFormated, options).toFile("./invoices/invoice" + id + ".pdf", function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}

module.exports = createPdf;
