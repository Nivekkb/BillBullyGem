export type CreditItem = {
    id: string;
    userId: string;
    bureau: string;
    accountName: string;
    accountNumber: string;
    type: string;
    status: string;
    disputeDate?: string;
    responseDeadline?: string;
    createdAt: any; // Firestore ServerTimestamp
};

export type DisputeLetter = {
    id: string;
    creditItemId: string;
    letterType: string;
    generatedText: string;
    mailedDate?: string;
    trackingNumber?: string;
    responseReceived?: boolean;
    createdAt: any; // Firestore ServerTimestamp
}

export type Subscription = {
    id: string;
    userId: string;
    serviceName: string;
    amount: number;
    billingFrequency: string;
    status: 'Active' | 'Canceled';
    cancellationDate?: string;
    createdAt: any; // Firestore ServerTimestamp
};
