import { App } from './App';
import { Container } from 'inversify';
import { ContainerService } from './ContainerService';
import { Symbols } from './Constants/constants';

const main = async () => 
{
    const container = new Container();
    const containerService = new ContainerService();
    await containerService.RegisterORM(container);
    containerService.RegisterDependencies(container);
    containerService.RegisterRouter(container);
    containerService.RegisterApp(container);
    
    const app = container.get<App>(Symbols.App);
    app.init();
}

main().catch(err => {
    console.log(err)
});