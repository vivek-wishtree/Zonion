
export interface Restaurant {
    restaurantId: number;
    name: string;
    address: string;
    phone: string;
    openTime: string;
    closingTime: string;
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