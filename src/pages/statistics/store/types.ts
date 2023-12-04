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


export interface IStatistic {
    chart: TraderStats[];
    stats: Stats | null
}

export interface PaymentStatus {
    percentage: number;
    payments: number;
}

export interface PaymentStatusDistribution {
    approved : PaymentStatus;
    canceled: PaymentStatus;
    frozen: PaymentStatus;
    totalPayments: number;
}

export interface Stats {
    appealsProcessingTimeDistribution: ProcessingTimeDistribution;
    banksDistribution: {[key:string] : number};
    paymentStatusDistribution: PaymentStatusDistribution;
    paymentsApprovalTimeDistribution: AppealsProcessingTimeDistribution;
}

export type TraderStatsItem = {income: number, turnover: number, date: string}

export interface TraderStats {
    'income': number,
    'turnover': number,
    'data': TraderStatsItem[]
}

export interface ProcessingTimeDistribution {
    [key:string] : {
        averageApprovalTime: number;
        percentage: number
    }
}
export interface AppealsProcessingTimeDistribution {
    [key:string] : {
        averageAppealTime: number;
        percentage: number
    }
}
