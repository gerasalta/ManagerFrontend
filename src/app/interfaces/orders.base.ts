export interface Order {
    _id: string,
    discount: number,
    term: Date,
    managerId: string,
    orders: Array<any>,
    advances: Array<any>
}
