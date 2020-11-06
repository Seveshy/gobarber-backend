import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateMailProvider implements IMailTemplateProvider {
    public async parse({ template, 
    }: 
        IParseMailTemplateDTO): Promise<string> {
        return template;
    }
}

export default FakeMailTemplateMailProvider; 