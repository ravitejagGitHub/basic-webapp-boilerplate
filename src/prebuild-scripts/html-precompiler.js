const fs = require("fs");
const path = require("path");

const templateFile = "a2b2c-template.html";

const names = ["login"];

const filePath = path.join(__dirname, "..", templateFile);
// console.log(filePath);

const templateContent = fs.readFileSync(filePath, {
	encoding: "utf8",
	flag: "r",
});
// console.log(templateContent);

names.forEach((name) => {
	try {
		const filePath = path.join(__dirname, "..", name, `${name}.html`);
		// console.log(filePath);
		const fileContent = fs.readFileSync(filePath, {
			encoding: "utf8",
			flag: "r",
		});
		let newTemplateContent = templateContent.replace(
			/{{placeholder}}/gi,
			fileContent
		);
		// newTemplateContent += `<script src="${name}.js"></script>`;
		// console.log(newTemplateContent);

		const target = path.join(__dirname, "../..", "build", "sit", "html");

		if (!fs.existsSync(target)) {
			fs.mkdirSync(target, { recursive: true });
		}
		const newFilePath = path.join(target, `${name}.html`);
		fs.writeFileSync(newFilePath, newTemplateContent);
	} catch (e) {
		console.error(e);
	}
});
