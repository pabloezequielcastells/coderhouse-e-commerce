import fs from 'fs';
import __dirname from "../utils.js";

const readFile = async(fileName) => {
    console.log(__dirname);
    const filePath = `${__dirname}/storage/${fileName}`;
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export default readFile;