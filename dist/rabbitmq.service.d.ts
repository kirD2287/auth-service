export declare class RabbitMQService {
    private authClient;
    private projectClient;
    constructor();
    publish(pattern: string, data: any): Promise<void>;
}
