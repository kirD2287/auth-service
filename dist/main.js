"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API на Nest.js')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('Kirill Dyachkov')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
//# sourceMappingURL=main.js.map