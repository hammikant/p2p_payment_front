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
    create_as: string
}

export interface IStatistic {
    chart: IChart[]
}
