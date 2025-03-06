export interface IUserFlow {
    userId: string
    userName: string
    flowName: string;
    flowType: 'dynamic' | 'static';
    flowJson: string
    keywords: string[]
}
