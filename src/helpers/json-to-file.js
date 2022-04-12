import fs from 'fs';
import __dirname from "../utils.js";

const writeFile = async(fileName, content) => {
    const filePath = `${__dirname}/storage/${fileName}`;
    await fs.promises.writeFile(filePath, JSON.stringify(content));
}

export default writeFile;