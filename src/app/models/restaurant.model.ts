
export interface Restaurant {
    restaurantId: number;
    name: string;
    address: string;
    phone: string;
    openTime: Date;
    closingTime: Date;
    menuImageUrl: string;
    lastUpdatedTime?: Date;
    updatedById?: number;
    createdById?: number;
    deletedById?: number;
    createdBy?:any;
    updatedBy?:any;
    deletedBy?:any;
    isActive: boolean;
}