export interface PenalizationI {
  id?: string;
  reason: PenalizationReasonEnum;
  idTransaction: string;
  amount: number;
  status: PenalizationStatusEnum;
}

export enum PenalizationReasonEnum {
  LATE_RETURN = "late_return",
  DAMAGE = "damage",
  LOST = "lost",
}

export enum PenalizationStatusEnum {
  PENDING = "pending",
  PAID = "paid",
  CANCELED = "canceled",
}
