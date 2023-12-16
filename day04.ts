type Address = { address: string; city: string };
type PresentDeliveryList<T> = { [K in keyof T]: Address };
