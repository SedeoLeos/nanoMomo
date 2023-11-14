export declare class ProvioningController {
    private pimarykey;
    private providerCallbackHost;
    referenceId: string;
    constructor(pimarykey: string, providerCallbackHost: string);
    generateRefence(): string;
    createUserId(): Promise<unknown>;
    createApikey(): Promise<unknown>;
}
