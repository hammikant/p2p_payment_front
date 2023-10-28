export interface IStatisticData {
    income: number;
    incomeUs: number;
    turnover: number;
    turnoverUs: number;
    statisticDataList: {
        banks: string;
        cards: string;
        sbp: string;
        payments: string;
    }
}

export interface IChart {
    income: string;
    turnover: string;
    date: string
}

export interface IStatistic {
    chart: IChart[];
    stats: Stats | null
}

interface PaymentStatus {
    percentage: number;
    payments: number;
}

export interface Stats {
    appealsProcessingTimeDistribution: ProcessingTimeDistribution;
    banksDistribution: {[key:string] : number};
    paymentStatusDistribution: {
        approved : PaymentStatus;
        canceled: PaymentStatus;
        frozen: PaymentStatus;
        totalPayments: number;
    };
    paymentsApprovalTimeDistribution: ProcessingTimeDistribution;
}

export interface ProcessingTimeDistribution {
    [key:string] : {
        averageApprovalTime: number;
        percentage: number
    }
}
