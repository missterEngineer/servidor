import CodeGenerator from "node-code-generator";

const codeGenerator = () =>{

const generator = new CodeGenerator()
    const pattern = '*########';
    const howMany = 1;

    return generator.generateCodes(pattern, howMany);
};

export default codeGenerator;